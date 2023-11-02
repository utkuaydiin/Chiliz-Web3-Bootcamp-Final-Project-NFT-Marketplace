/*import { getMarketplaceAddress, getNFTAddress } from "./getContractAddress";*/

import { useContract} from "@thirdweb-dev/react";

export const getMarketplaceAddress = () => {
    return process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS ?? "";
};

export const getNFTAddress = () => {
    return process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "";
};





export const getMarketplaceContract = () => {
    let marketplace_adress = getMarketplaceAddress();

    const { contract: marketplace, isLoading: marketplaceLoading} = useContract(marketplace_adress, "marketplace-v3");

    return { marketplace, marketplaceLoading };
};

export const getNFTContract = () => {
    let nft_adress = getNFTAddress();

    const { contract: nft_contract, isLoading: nftLoading} = useContract(nft_adress);

    return { nft_contract, nftLoading };
};


