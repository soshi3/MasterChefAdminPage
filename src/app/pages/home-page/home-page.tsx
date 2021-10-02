import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {
    Collapse,
    Button,
    Input,
    Label,
    CardBody,
    Card, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import {airDropAbi, chipsAbi, erc20Abi, lpTokenAbi, masterChefAbi, multiCallAbi} from "../../core/data/abi";
import {contractAddressData} from "../../core/data/contract-address-data";
import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import {toast} from "../../core/utils/notification.util";
import {setLocalStorageWalletAddress} from "../../core/utils/wallet";
import {isBscNetwork} from "../../core/utils/network";

import 'bootstrap/dist/css/bootstrap.min.css';
import {environment} from "../../../environment";

export const HomePage = () => {

    const bscWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rinkebyNetworkUrl));
    const ethereum = window.ethereum;
    const metaWeb3 = new Web3(ethereum);

    const {address, setAddress} = useWallet();

    const [isLoading, setIsLoading] = useState(true);
    const [totalAllocPoint, setTotalAllocPoint] = useState<number>(0);
    const [poolInfos, setPoolInfos] = useState<any[]>([]);
    const [poolData, setPoolData] = useState<any>({ allocPoint: -1, lpTokenAddress: '' });
    const [editIndex, setEditIndex] = useState(-1);
    const [isEditModalShow, setIsEditModalShow] = useState(false);
    const [updatePoolInfo, setUpdatePoolInfo] = useState({ pid: 0, allocPoint: -1 });

    const masterChefContract = new bscWeb3.eth.Contract(masterChefAbi, contractAddressData.masterChefAddress);

    useEffect(() => {
        getPoolInfo().then(() => {
            setIsLoading(false);
        });
    }, []);

    const getPoolInfo = async () => {
        const poolLength = await masterChefContract.methods.poolLength().call();
        const allocPoint = await masterChefContract.methods.totalAllocPoint().call();
        setTotalAllocPoint(allocPoint);
        let temp: any[] = [];
        for(let i = 0 ; i < poolLength ; i++) {
            const pool = await masterChefContract.methods.poolInfo(i).call();
            const lpTokenAddress = pool.lpToken;
            if(i === 0) {
                const lpTokenContract = new bscWeb3.eth.Contract(erc20Abi, lpTokenAddress);
                const contractName = await lpTokenContract.methods.name().call();
                pool['lpContractName'] = contractName;
            } else if(i > 0) {
                const lpTokenContract = new bscWeb3.eth.Contract(lpTokenAbi, lpTokenAddress);
                const token0Address = await lpTokenContract.methods.token0().call();
                const token1Address = await lpTokenContract.methods.token1().call();

                const token0Contract = new bscWeb3.eth.Contract(erc20Abi, token0Address);
                const token0Name = await token0Contract.methods.symbol().call();
                const token1Contract = new bscWeb3.eth.Contract(erc20Abi, token1Address);
                const token1Name = await token1Contract.methods.symbol().call();
                pool['lpContractName'] = `${token0Name}-${token1Name} LP`
            }
            pool['isOpen'] = false;
            temp.push(pool);
        }
        setPoolInfos([...temp]);
    }

    const connectWallet = () => {
        window.ethereum.request({method: 'eth_requestAccounts'})
            .then(handleAccountsChanged)
            .catch(async (err: any) => {
                setAddress('');
                setLocalStorageWalletAddress('').then();
                if (err.code === 4001) {
                    toast('danger', 'Please connect to MetaMask.');
                }
            });
    }

    const handleAccountsChanged = async (accounts: any[]) => {
        if (!await isBscNetwork()) {
            setAddress('');
            setLocalStorageWalletAddress('').then();
            return;
        }
        if (!accounts || !accounts.length) {
            setAddress('');
            setLocalStorageWalletAddress('').then();
            toast('danger', 'Please connect to MetaMask.');
            return;
        }
        setAddress(accounts[0]);
        setLocalStorageWalletAddress(accounts[0]).then();
    }

    return (
        <LoadingOverlay
            active={isLoading}
            text="Loading Pool Infos..."
            spinner
            className="d-flex container flex-column justify-content-center align-content-center h-100 mt-20"
        >
            <div className="d-flex flex-column px-30 py-15 border-2 border-color-primary border-radius-10 mb-20">
                {
                    address === '' ? (
                        <button className="btn btn-danger" onClick={() => connectWallet()}>Connect Wallet</button>
                    ) : (
                        <div>
                            <div className="d-flex flex-column px-30 py-15 border-2 border-color-primary border-radius-10 mb-20">
                                <h2 className="d-flex">Total AllocPoint:<h2 className="text-danger">{totalAllocPoint}</h2></h2>
                            </div>
                            <div className="d-flex flex-column px-30 py-15 border-2 border-color-primary border-radius-10 mb-20">
                                <h2>Pool Info:</h2>
                                <div className="mt-3">
                                    {
                                        poolInfos.map((pool, index) => (
                                            <div key={index}>
                                                <Button className="d-flex justify-content-between align-items-center w-100 mt-3" color={parseInt(pool.allocPoint) === 0 ? "dark" : "success"}
                                                onClick={() => {
                                                    let temp = poolInfos;
                                                    temp[index].isOpen = !poolInfos[index].isOpen;
                                                    setPoolInfos([...temp]);
                                                }}>
                                                    {pool.lpContractName}
                                                    {
                                                        poolInfos[index].isOpen ? (
                                                            <IoIosArrowUp/>
                                                        ) : (
                                                            <IoIosArrowDown/>
                                                        )
                                                    }
                                                </Button>
                                                <Collapse isOpen={pool.isOpen}>
                                                    <Card>
                                                        <CardBody>
                                                            <label>ID: {index}</label> <br/>
                                                            <label>Address: {pool.lpToken}</label> <br/>
                                                            <label>AllocPoint: {pool.allocPoint}</label> <br/>
                                                            <label>LastRewardBlock: {pool.lastRewardBlock}</label> <br/>
                                                        </CardBody>
                                                        <CardFooter className="d-flex ">
                                                            <Button className="mt-3" color={pool.allocPoint === 0 ? "dark" : "secondary"}
                                                                    onClick={() => {
                                                                        setEditIndex(index);
                                                                        setIsEditModalShow(true);
                                                                        const poolInfo = poolInfos[index];
                                                                        setUpdatePoolInfo({ ...updatePoolInfo, pid: index, allocPoint: poolInfo.allocPoint });
                                                                    }}>
                                                                Edit
                                                            </Button>
                                                            <Button className="ml-5 mt-3" disabled={parseInt(pool.allocPoint) === 0}
                                                                    onClick={() => {
                                                                        const masterContract = new metaWeb3.eth.Contract(masterChefAbi, contractAddressData.masterChefAddress);
                                                                        console.log(updatePoolInfo.pid, 0, true);
                                                                        setIsLoading(true);
                                                                        masterContract.methods.set(updatePoolInfo.pid, 0, true).send({from: address})
                                                                        .on('error', function (error: any) {
                                                                            setIsLoading(false);
                                                                        })
                                                                        .on('confirmation', async () => {
                                                                            getPoolInfo().then(() => {
                                                                                setIsLoading(false);
                                                                            });
                                                                        });
                                                                    }}>
                                                                Remove
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                </Collapse>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="d-flex flex-column px-30 py-15 border-2 border-color-primary border-radius-10 mb-20">
                                <h2>Add liquidity:</h2>
                                <div className="mt-3">
                                    <Label>allocPoint:</Label>
                                    <Input className="border-1" placeholder="allocPoint"
                                           onChange={(e) => {
                                               setPoolData({ ...poolData, allocPoint: parseInt(e.target.value) });
                                           }}
                                    />
                                </div>
                                <div className="mt-3">
                                    <Label>lpToken (address):</Label>
                                    <Input className="border-1" placeholder="lpToken (address)"
                                           onChange={(e) => {
                                               setPoolData({ ...poolData, lpTokenAddress: e.target.value });
                                           }}
                                    />
                                </div>
                                {/*<div className="mt-3">*/}
                                {/*    <Label>withUpdate (bool):</Label>*/}
                                {/*    <Input className="border-1" placeholder="withUpdate (bool)"/>*/}
                                {/*</div>*/}
                                <div className="d-flex justify-content-end mt-5">
                                    <Button color="secondary" disabled={!(poolData.allocPoint > 0 && poolData.lpTokenAddress.length === 42)}
                                    onClick={() => {
                                        const masterContract = new metaWeb3.eth.Contract(masterChefAbi, contractAddressData.masterChefAddress);
                                        if(poolData.allocPoint < 0) {
                                            toast('danger', 'Please input value of allocPoint.');
                                            return;
                                        }
                                        if(poolData.lpTokenAddress.length === 0) {
                                            toast('danger', 'Please input value of lpTokenAddress.');
                                            return;
                                        }
                                        if(poolData.lpTokenAddress.length > 0 && poolData.lpTokenAddress.length !== 42) {
                                            toast('danger', 'Please input value of lpTokenAddress correctly.');
                                            return;
                                        }
                                        setIsLoading(true);
                                        masterContract.methods.set(updatePoolInfo.pid, updatePoolInfo.allocPoint, true).send({from: address})
                                        .on('error', function (error: any) {
                                            setIsLoading(false);
                                        })
                                        .on('confirmation', async () => {
                                            getPoolInfo().then(() => {
                                                setIsLoading(false);
                                            });
                                        });
                                    }}>
                                        Add Liquidity
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <Modal isOpen={isEditModalShow} toggle={() => setIsEditModalShow(!isEditModalShow)}>
                <ModalHeader>Edit</ModalHeader>
                <ModalBody>
                    <div className='guideline-wrapper'>
                        <div className="mt-3">
                            <Label>allocPoint:</Label>
                            <Input className="border-1" placeholder="allocPoint" value={updatePoolInfo.allocPoint} type="number"
                                   onChange={(e) => {
                                       setUpdatePoolInfo({ ...updatePoolInfo, allocPoint: parseInt(e.target.value) });
                                   }}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary"
                        onClick={() => {
                            const masterContract = new metaWeb3.eth.Contract(masterChefAbi, contractAddressData.masterChefAddress);
                            setIsLoading(true);
                            console.log(updatePoolInfo.pid, updatePoolInfo.allocPoint, true);
                            masterContract.methods.set(updatePoolInfo.pid, updatePoolInfo.allocPoint, true).send({from: address})
                            .on('error', function (error: any) {
                                setIsLoading(false);
                            })
                            .on('confirmation', async () => {
                                getPoolInfo().then(() => {
                                    setIsLoading(false);
                            });
                        });
                        }}
                        disabled={updatePoolInfo.allocPoint.toString() === 'NaN'}
                    >Update</Button>
                    <Button color="secondary" onClick={() => setIsEditModalShow(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </LoadingOverlay>
    );
}
