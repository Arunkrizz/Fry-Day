import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Flex } from '@chakra-ui/react';

const PieChart = ({data}) => {


  return (
    <Flex w={"md"} h={"md"} >
    <ResponsivePie
      data={data}
      margin={{ top: 0, right: 120, bottom: 80, left: 120 }}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      
    />
  </Flex>
  );
};

export default PieChart;
