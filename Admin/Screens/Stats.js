import React, { Component } from 'react'
import { Text, View,StyleSheet ,ScrollView,Dimensions} from 'react-native'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export default class Stats extends Component {
  render() {
    return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Statistics</Text>
        </View>


        <View>
  <Text>Bezier Line Chart</Text>
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
    height={300}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    // bezier
    // style={{
    //   marginVertical: 8,
    //   borderRadius: 16
    // }}
  />
</View>


<ScrollView horizontal={true} >
<BarChart
     style={{margin:7,borderRadius:15}}
    data={{
      labels: ["prod-1","prod-2","prod-3"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
           
          ],
          
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    // bezier
    // style={{
    //   marginVertical: 8,
    //   borderRadius: 16
    // }}
  />
</ScrollView>


<ScrollView >

<PieChart
        style={{marginBottom:100}}
     data={ [
        {
          name: "Seoul",
          population: 21500000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        },
        {
          name: "Toronto",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        },
        {
          name: "Beijing",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        },
        {
          name: "New York",
          population: 8538000,
          color: "#ffffff",
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        },
        {
          name: "Moscow",
          population: 11920000,
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        }
      ]}
     width={Dimensions.get("window").width}
     height={250}
     chartConfig={{
        
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        
      }}
     accessor={"population"}
     backgroundColor={"transparent"}
     
     center={[10, 10]}
     
     absolute
  />

    </ScrollView>
</View>
       

           
            

      

       

       



       
        
      
      </ScrollView>
    )
  }
}
const styles=StyleSheet.create({
    container:{
        flex:1
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