import React, { Component } from 'react'
import { Text, View,StyleSheet,FlatList ,Dimensions,ScrollView} from 'react-native'
import { data } from '../src/data'
import Card from '../src/Card'

import {
  LineChart

} from "react-native-chart-kit";

export function Transactions () {

  const renderItem=({item})=>{
    return(
      <Card
      itemData={item}
      onPress={()=>{}}></Card>
    )

  }

    return (
      <View style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.headerText}>Transactions</Text>
        </View>



        <View style={styles.fixedSection}>
                {/* Content for the fixed section */}
                <LineChart
                style={{margin:7,borderRadius:15}}
                data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ],

                    }
                  ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={200}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "green",
                  backgroundGradientFrom: "#CBFFA9",
                  backgroundGradientTo: "#CBFFA9",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(0,100,0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0,100,1, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "3",
                    strokeWidth: "2",
                    stroke: "green"
                  }
                }}
                // bezier
                // style={{
                //   marginVertical: 8,
                //   borderRadius: 16
                // }}
          />
      </View>

        {/* Content for the scrollable section */}
      {/* <FlatList
            style={styles.scrollableSection}
            data={data}
            renderItem={renderItem}
            keyExtractor={item=>item.id}>
      </FlatList>  */}
        {/* Add more content here */}





      </View>
    )

}

const styles= StyleSheet.create({
  container:{
    flex:1,

    flexDirection: 'column', 

  },

  fixedSection: {
    height: '30%', // Take half of the available width

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: `rgba(240,255,240,0.5)`
  },
  scrollableSection: {
    height:'70%', // Take the other half of the available width
    backgroundColor: 'white',
    padding: 12,
  },
  header:{
    height:60,
    width:'100%',
    backgroundColor:'#fff',
    elevation:5,
    paddingLeft:20,
    justifyContent:'center'

},
headerText:{
    fontSize:20,
    fontWeight:'800'
},
})