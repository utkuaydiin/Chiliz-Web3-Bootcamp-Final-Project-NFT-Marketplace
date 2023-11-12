import Layout from "@/layout/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMarketplaceContract, getNFTContract } from "@/util/getContractAddress";
import NFTDetails from "@/components/NFTDetails";
import {useNFT, useValidDirectListings} from "@thirdweb-dev/react";
import CancelSellingCard from "@/components/CancelSelling";
import SellNFTCard from "@/components/SellNFTCard";
export default NFTDetailsPage;
function NFTDetailsPage() {
    const router = useRouter();
    const [price, setPrice] = useState(0.01);
    const [symbol, setSymbol] = useState("");
    const [listingID, setListingID] = useState("listing");
    const [nftID, setNftID] = useState("NFTDetails");
    const [address, setAddress] = useState("");

    const {nft_contract} = getNFTContract();
    const {marketplace} = getMarketplaceContract();

    const {data: nft, isLoading: isNFTLoading } = useNFT(nft_contract, nftID);

    const {data: directListings} = useValidDirectListings(marketplace, {
        start: 0,
        count: 100,
    });

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { id } = router.query;
            setNftID(id as string);
        }


        let listedNFT = directListings?.find((item: any) => item.tokenId === nftID)
        if (listedNFT){
            setListingID(listedNFT.id);
            setPrice(Number(listedNFT.currencyValuePerToken.displayValue));
            setSymbol(listedNFT.currencyValuePerToken.symbol);

        }
    }, [directListings, price, listingID, router.query]);

    /*const handleTransfer = async () => {
        try{
            alert('Transfering to address : ${contractId}.');
        }
    catch (error) {
        alert("Transfer is failed ");
    }
};*/
    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    NFT Details
                </h1>

                {isNFTLoading || !nft ? (
                <div className="text-center">
                    {'Loading NFT with id ${nftID} '}
                    </div>
                ) : (
                   <>
                   
                   <NFTDetails {...nft} />

                   {listingID ? (
                   <CancelSellingCard 
                   price={price} 
                   symbol={symbol} 
                   listingID={listingID}
                   />
                   ) : (
                   <>
                   <SellNFTCard 
                   price={0} 
                   onUpdatePrice={setPrice} 
                   id={nftID}
                   />
                   <div className="my-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Recipient Address
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter recipient address" 
                            className="text-center"
                            onChange={handleAddressChange}
                        />
                    </div>
                </>
                )}
                </>
                )}
            </div>
        </Layout>
    );
}

