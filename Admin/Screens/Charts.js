import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView ,StyleSheet} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { responsiveHeight, responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../Reducers/OrderReducer';
// import { PieChart } from 'react-native-svg-charts';
import { color } from '@mui/system';
import { fetchGroceries } from '../../Reducers/GroceryReducer';
import { ActivityIndicator } from 'react-native';

import {PieChart} from "react-native-chart-kit";

import { fetchUsers } from '../../Reducers/UserReducer';




export default function Charts() {


  
  const dispatch=useDispatch()
  const orders=useSelector((state)=>state.orders.data)
  const totalOrders=orders.length
  //   console.log(orders)

  const users=useSelector((state)=>state.users.data)
  const totalUsers=users.length

  const groceries = useSelector((state) => state.groceries.data);
  const totalGroceries=groceries.length
  const [categorySum,setCategorySum]=useState({})

  const [revenue,setRevenue]=useState(0)
  const [top5,setTop5]=useState({})
  const [x,setX]=useState([])
  const [y,setY]=useState([])

  const [isPie,setIsPie]=useState(0)




  useEffect(() => {
    dispatch(fetchUsers())
    .then() // Data fetched, set isLoading to false
    .catch((error) => {
      console.error("Error fetching data:", error);
     // In case of an error, also set isLoading to false
    });
  }, [dispatch]);


  

  const [data1, setData1] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    // Whenever x or y states change, update data1
    const updatedData = {
      labels: x,
      datasets: [
        {
          data: y,
        },
      ],
    };
    console.log("Line chart data:- ",updatedData)
    setData1(updatedData); // setData1 is a state setter for data1

    // Additionally, you can use updatedData directly where you need it
    // e.g., pass it as a prop to LineChart component
    // <LineChart data={updatedData} ...otherProps />
  }, [x, y,orders,dispatch]);
  

  useEffect(() => {
    dispatch(fetchGroceries())
    .then() // Data fetched, set isLoading to false
    .catch((error) => {
      console.error("Error fetching data:", error);
      
    });

    const getCategoryCount=()=>{
        const categoryCount = {};

// Iterate through the data and count the occurrences of each category
    groceries.forEach(item => {
    const category = item.category;
    if (categoryCount[category]) {
        categoryCount[category]++;
    } else {
        categoryCount[category] = 1;
    }
    });

    console.log("Category count:-",categoryCount)
    console.log("Category count Snacks:-",categoryCount['Snacks'])
    setCategorySum(categoryCount)
    setIsPie(1)
    }

    getCategoryCount()
  }, [dispatch]);





  const getTop5 = () => {
    const revenuePerItem = {};

    // Iterate through the data and count the occurrences of each item
    orders.forEach(order => {
      const items = order.items;
      items.forEach(item => {
      //   console.log("Order:", order);
        // console.log("Item:", item);

        const title = item.title;

        if (revenuePerItem[title]) {
          revenuePerItem[title] += item.price * item.count;
        } else {
          revenuePerItem[title] = item.price * item.count;
        }
      });
    });

   
  //   console.log('revenuePerItem:', revenuePerItem);

    // Check the data in the console and troubleshoot any issues

    if (Object.keys(revenuePerItem).length > 2) {

      // console.log('in if')
      const keys = Object.keys(revenuePerItem);
      const slicedKeys = keys.slice(0, 3);

      const slicedDictionary = {};
      slicedKeys.forEach(key => {
        slicedDictionary[key] = revenuePerItem[key];
      });

      setTop5(slicedDictionary);
    } else{
      console.log('in else',revenuePerItem)
      setTop5(revenuePerItem);
    }
    

    console.log('Top5',setTop5(revenuePerItem))
    
    // setX(Object.keys(top5))
    // console.log(x)
    // setY( Object.values(top5))
    // console.log(y)
  };
 
  useEffect(() => {
    getTop5();
}, [orders, dispatch]);

useEffect(() => {
    // Convert top5 into arrays for x and y
    const keys = Object.keys(top5);
    const values = Object.values(top5);

    setX(keys);
    setY(values);

    // Update data1
    const updatedData = {
        labels: keys,
        datasets: [
            {
                data: values,
            },
        ],
    };
    setData1(updatedData);
}, [top5]);

  const getRevenue=()=>{

    let sum=0

    orders.forEach(order=>{
        sum=sum+order.grandTotal
    })
    // console.log(sum)
    setRevenue(sum)
    // getTop5()

  }





  useEffect(() => {
    dispatch(fetchOrders())
      .then(() => {
        // getRevenue();
        // Introduce a timeout of 1000 milliseconds (1 second) before calling getTop5
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

     
      
  }, [dispatch]);


  // useEffect(()=>{
  //  getTop5()
  // },[dispatch])
  
//   useEffect(() => {

   
//     dispatch(fetchOrders())
//     .then(()=> {getRevenue();}) // Data fetched, set isLoading to false
//     .catch((error) => {
//       console.error("Error fetching data:", error);
      
//     });
//     getTop5()
    
//   }, [dispatch]);



useEffect(()=>{
   
       
      
    getRevenue()
   
},[orders,dispatch])

// useEffect(()=>{
   
       
      
//     getTop5()
   
// },[orders,dispatch])
  
   
// useEffect(()=>{
//     const getTop5 = () => {
//         const revenuePerItem = {};
    
//         // Iterate through the data and count the occurrences of each item
//         orders.forEach(order => {
//           const items = order.items;
//           items.forEach(item => {
//           //   console.log("Order:", order);
//           //   console.log("Item:", item);
    
//             const title = item.title;
    
//             if (revenuePerItem[title]) {
//               revenuePerItem[title] += item.price * item.count;
//             } else {
//               revenuePerItem[title] = item.price * item.count;
//             }
//           });
//         });
    
       
//       //   console.log('revenuePerItem:', revenuePerItem);
    
//         // Check the data in the console and troubleshoot any issues
    
//         if (Object.keys(revenuePerItem).length > 4) {
//           const keys = Object.keys(revenuePerItem);
//           const slicedKeys = keys.slice(0, 5);
    
//           const slicedDictionary = {};
//           slicedKeys.forEach(key => {
//             slicedDictionary[key] = revenuePerItem[key];
//           });
    
//           setTop5(slicedDictionary);
//         } else{
//           setTop5(revenuePerItem);
//         }
    
//         console.log('Top5',top5)
//       };
//     getTop5()

// },[orders,dispatch])
// const orderByCategoryCount = {};

// // Iterate through the data and count the occurrences of each userName
// orders.forEach(order => {
//   const items = order.items;
//   console.log(items)
//   items.forEach(item=>{
//     const category=item.category

//     if (orderByCategoryCount[category]) {
//         orderByCategoryCount[category]++;
//     }
//     else {
//         orderByCategoryCount[category] = 1;
//     }


//   })


 
// });

// // Display the total count of each userName
// for (const category in orderByCategoryCount) {
//   console.log(`User Name: ${category}, Count: ${orderByCategoryCount[category]}`);
// }
  // Line chart data
  
// // Extract the keys (product names) from the original object
// const productNames = x;
// console.log(productNames)

// // Extract the values (revenue) from the original object
// const revenueValues =y;
// console.log(revenueValues)

// Create the data object with dynamic labels



// const data1 = {
//   labels: x, // Use the product names as labels
//   datasets: [
//     {
//       data: y,
//     },
//   ],
// };






  // const data = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99],
  //     },
  //   ],
  // };

  // Line chart configuration
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Green line color
    strokeWidth: 2,
  };

  // Pie chart data
  // const pieData = [
  //   {
  //     key: 'Fruits & Vegetables',
  //     value: categorySum['Fruits & Vegetables'],
  //     svg: { fill: 'green' },
  //   },
  //   {
  //     key: 'Snacks',
  //     value: categorySum['Snacks'],
  //     svg: { fill: 'gray' },
  //   },
  //   {
  //       key: 'Dairy & Bakery',
  //       value: categorySum['Dairy & Bakery'],
  //       svg: { fill: 'red' },
  //     },
  //     {
  //       key: 'Beverages',
  //       value: categorySum['Beverages'],
  //       svg: { fill: 'blue' },
  //     },
  // ];
  const pieData = [
    {
      name: 'Fruits & Vegetables',
      population: categorySum['Fruits & Vegetables'],
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Snacks",
      population: categorySum['Snacks'],
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: 'Dairy & Bakery',
      population: categorySum['Dairy & Bakery'],
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: 'Beverages',
      population: categorySum['Beverages'],
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1,  }}>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
            <Text style={styles.lineChartTitle}>Revenue:</Text>
            <Text style={styles.cardPrice}> ₹{revenue}</Text>
        </View>
        <View style={styles.card}>
            <Text style={styles.lineChartTitle}>Orders:</Text>
            <Text style={styles.cardPrice}>{totalOrders}</Text>
        </View>

      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
            <Text style={styles.lineChartTitle}>Groceries:</Text>
            <Text style={styles.cardPrice}>{totalGroceries}</Text>
        </View>
        <View style={styles.card}>
            <Text style={styles.lineChartTitle}>Users:</Text>
            <Text style={styles.cardPrice}>{totalUsers}</Text>
        </View>
        {/* <View style={styles.card2}>
            <Text style={styles.lineChartTitle}>Revenue:</Text>
            <Text style={styles.cardPrice}>1000</Text>
        </View> */}

      </View>


      <Text style={styles.lineChartTitle}>Top 3 Products:</Text>
      {/* {top5?(<LineChart
        data={data1}
        width={responsiveWidth(95)}
        height={responsiveHeight(25)}
        chartConfig={chartConfig}
        style={styles.linechart}
      />):<ActivityIndicator></ActivityIndicator>} */}
      {data1.labels.length > 0 ? (
      <LineChart
        data={data1}
        width={responsiveWidth(95)}
        height={responsiveHeight(25)}
        chartConfig={chartConfig}
        style={styles.linechart}
      />
    ) : (
      <View style={{ height: responsiveHeight(25), width: responsiveWidth(95) }}>
          <ActivityIndicator size="large" color="#06FF00" />
      </View>
    
      
    )}
      
      <Text style={styles.lineChartTitle}>Weightage Of Categories :</Text>

    
     
    <View style={styles.pieContainer}>
        {/* <PieChart
            style={styles.pie}
            data={pieData}
            // innerRadius="15%"
            // outerRadius="70%"
            // labelRadius={({ innerRadius, outerRadius, index }) => outerRadius + 10}
        />
        <View style={styles.pieLabel}> 
           {
             pieData.map((item,index)=>(
                <Text  key={index} style={{ color: item.svg.fill }}>{item.key} :{item.value ? ((item.value / totalGroceries) * 100).toFixed(2) : 0}
                % </Text>
            ))
           }
        </View> */}
        {isPie ? (
           <PieChart
                
           data={pieData}
           width={responsiveWidth(90)}
           height={responsiveHeight(25)}
           chartConfig={{
               
               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
             
               
             }}
           accessor={"population"}
           backgroundColor={"transparent"}
           
           center={[0, 0]}
           
           
    />
     
    ) : (
      <View style={{ height: responsiveHeight(25), width: responsiveWidth(95) }}>
          <ActivityIndicator size="large" color="#06FF00" />
      </View>
    
      
    )}
       


    </View>    
      
    </ScrollView>
  );
}


const styles=StyleSheet.create(
    {
        linechart:{
            
           
            marginLeft:responsiveWidth(5),
            marginRight:responsiveWidth(5)

        },
        lineChartTitle:{
            fontSize: 20, 
            marginBottom: 10,
            marginLeft:responsiveWidth(5),
            marginTop:responsiveWidth(3)
        },
        pieContainer:{
            flex:1,
            flexDirection:'row',
            padding:responsiveWidth(5),
        },
        pie:{
            flexBasis:'50%',
            height:responsiveHeight(25),
          
           

        },
        pieLabel:{
            flexBasis:'50%',
            paddingLeft:responsiveWidth(7),
            paddingTop:responsiveWidth(5)

        },
        cardContainer:{
            flex:1,
            flexDirection:'row',
            // padding:responsiveWidth(5),
        },
        card:{
           
                flexDirection: "column",
                width: responsiveWidth(45),
                alignSelf: "center",
                backgroundColor: "#fff",
                elevation: 4,
                marginTop: responsiveHeight(1),
                borderRadius: 10,
                height: responsiveHeight(12),
                marginLeft:responsiveWidth(3),
                // marginRight:responsiveWidth(5)
               
        },
        card2:{
           
            flexDirection: "column",
            width: responsiveWidth(29),
            alignSelf: "center",
            backgroundColor: "#fff",
            elevation: 4,
            marginTop: responsiveHeight(1),
            borderRadius: 10,
            height: responsiveHeight(12),
            marginLeft:responsiveWidth(3)
           
    },
    cardPrice: {
        fontWeight: "200",
        fontSize: responsiveFontSize(2.5),
        color: "gray",
        marginLeft:responsiveWidth(5),
      },

    }
)