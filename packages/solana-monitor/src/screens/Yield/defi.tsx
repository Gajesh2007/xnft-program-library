import React, { useEffect, useState } from 'react';
import { View, Text, TextField } from "react-xnft";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function YieldScreen() {
  const [search, setSearch] = useState<any>("");
    const { data } = useSWR("https://api.llama.fi/charts/solana", fetcher);

    const diff  = data ? `${data[data.length-1]['totalLiquidityUSD'] > data[data.length-2]['totalLiquidityUSD'] ? data[data.length-2]['totalLiquidityUSD']/data[data.length-1]['totalLiquidityUSD'] : data[data.length-1]['totalLiquidityUSD']/data[data.length-2]['totalLiquidityUSD']}` : "";
    const g = data ? `${data[data.length-1]['totalLiquidityUSD'] > data[data.length-2]['totalLiquidityUSD'] ? "#39D98A" : "#FF5C5C"}` : "";
  
    const protocol_data = useSWR("https://yields.llama.fi/pools", fetcher);
    console.log("protocol data: ", protocol_data?.data?.data)
    const filtered = protocol_data?.data?.data?.filter((data, index) => data.chain === "Solana" && data.tvlUsd > 1000 && (data.symbol.includes(search)));
    console.log("protocol data filtered", filtered);

  const convertToInternationalCurrencySystem = (labelValue) => {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

  }

  return (
    <View style={{ height: "100%" }}>
      <View style={{position: "absolute", marginTop: "5px", height: "176px", width: "250px", background: "#0DD3E2", borderRadius:"100px", opacity: "0.1", filter: "blur(25px)"}}></View>
      <View style={{position: "absolute", marginTop: "600px", marginLeft:"150px" ,height: "176px", width: "250px", background: "#0DD3E2", borderRadius:"100px", opacity: "0.1", filter: "blur(25px)"}}></View>

      <Text style={{fontStyle:"normal", fontWeight:"700", fontSize: "18px", lineHeight: "150%", color: "#FFFFFF", marginTop: "20px", marginLeft: "16px"}}>Yield Ranking</Text>
      {/* <TextField style={{width:"200px",marginLeft:"20px", marginRight: "20px"}} placeholder="Search by Name" value={search} onChange={(e) => setSearch(e.data.value)}/> */}
      
      <View style={{display: "flex", flexDirection: "row", marginTop: "8px", marginLeft: "16px"}}>
        <Text style={{fontWeight: "400", fontSize: "12px", lineHeight: "150%", color: "rgba(255, 255, 255, 0.45)"}}>Name</Text>
        <Text style={{fontWeight: "400", fontSize: "12px", lineHeight: "150%", color: "rgba(255, 255, 255, 0.45)", marginLeft: "105px"}}>Project</Text>
        <Text style={{fontWeight: "400", fontSize: "12px", lineHeight: "150%", color: "rgba(255, 255, 255, 0.45)", marginLeft: "25px"}}>Liquidity</Text>
        <Text style={{fontWeight: "400", fontSize: "12px", lineHeight: "150%", color: "rgba(255, 255, 255, 0.45)", marginLeft: "20px"}}>APY</Text>
      </View>
      {filtered &&
          filtered?.map((item, index) => {
            return (
              <>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px", marginBottom: "16px"}}>
                    <Text style={{fontWeight: "400", fontSize: "12px", marginLeft: "16px"}}>{index + 1}</Text>
                    {/* <Image 
                      src={item.logo}
                      style={{
                        width: "23px",
                        height: "23px",
                        marginLeft: `${(index + 1 <= 10) ? "10px" : "8px" }`,
                        borderRadius: "50px",
                      }}
                    /> */}
                    <View style={{width: "90px"}}>
                      <Text style={{fontStyle: "normal", fontWeight:"400", fontSize: "12px", lineHeight: "120%", color: "#0DD3E2", marginLeft: "4px"}}>{item.symbol}</Text>
                    </View>
                    <View style={{width: "53px", justifyContent: "right", alignItems: "right"}}>
                      <Text style={{justifyContent: "right", alignItems: "right", fontStyle: "normal", fontWeight:"400", fontSize: "12px", lineHeight: "120%", color: "white", marginLeft: "45px"}}>{`${item.project.charAt(0).toUpperCase()}${item.project.toString().slice(1)}`}</Text>
                    </View>
                    <View style={{width: "57px", justifyContent: "right", alignItems: "right"}}>
                      <Text style={{justifyContent: "right", alignItems: "right", fontStyle: "normal", fontWeight:"400", fontSize: "12px", lineHeight: "120%", color: "white", marginLeft: "50px"}}>{convertToInternationalCurrencySystem(item.tvlUsd)}</Text>
                    </View>
                    <View style={{width: "57px", justifyContent: "right", alignItems: "right"}}>
                      <Text style={{justifyContent: "right", alignItems: "right", fontStyle: "normal", fontWeight:"400", fontSize: "12px", lineHeight: "120%", color: "white", marginLeft: "65px"}}>{item.apy?.toString().slice(0,4)}%</Text>
                    </View>
                </View>
                <View style={{background: "rgba(255, 255, 255, 0.06)", borderRadius: "1px", width: "100%", height:"1px", marginLeft:"5px", marginRight: "16px"}}></View>

              </>
            );
          })}
    </View>
  );
}
