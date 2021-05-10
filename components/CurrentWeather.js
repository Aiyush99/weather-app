import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,Image,ScrollView,RefreshControl} from 'react-native'
import * as Location from "expo-location";
import { Container, Header, Content, Accordion } from "native-base"
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Fragment } from 'react';
import Loader from "./Loader";
import { TouchableOpacity } from 'react-native-gesture-handler';
const API_KEY = `375b68d9b9278b96930f88f6f8d06dc2`
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/onecall?`

const wait = (timeout) =>{
  return new Promise(resolve => setTimeout(resolve,timeout));
}

const CurrentWeather = () => {
   const [errorMessage,setErrorMessage] = useState(null)
   const [currentWeather,setCurrentWeather] = useState(null)
   const [metricSystem,setMetricSystem] = useState("metric")
   const [forecast,setForecast] = useState(null)
   const [refreshing,setRefreshing] = useState(false)

   useEffect(() => {
     load()
     loadForecast()
   }, [])

   async function load(){
     try{
       let {status} = await Location.requestPermissionsAsync()

       if(status !== 'granted'){
         setErrorMessage("Access to location is required to see weather")
         return
       }
       const location = await Location.getCurrentPositionAsync()

       const {latitude,longitude} = location.coords
       const weatherUrl = `${BASE_URL}lat=${latitude}&units=${metricSystem}&lon=${longitude}&appid=${API_KEY} ` 
       const response = await fetch(weatherUrl)
       const result = await response.json()

       if(response.ok){
        
         setCurrentWeather(result)
       }
       else{
         setErrorMessage(result.errorMessage)
       }
     }
     catch(error){
       setErrorMessage(error.errorMessage)
     }
   }

   const loadForecast = async () => {
    try{
      let {status} = await Location.requestPermissionsAsync()

      if(status !== 'granted'){
        setErrorMessage("Access to location is required to see weather")
        return
      }
      const location = await Location.getCurrentPositionAsync()

      const {latitude,longitude} = location.coords
      const forecastUrl = `${FORECAST_URL}lat=${latitude}&units=${metricSystem}&lon=${longitude}&appid=${API_KEY}`
      const res = await fetch(forecastUrl)
      const forecast = await res.json()

      if(res.ok){
       
         setForecast(forecast)
      }
      else{
        setErrorMessage(result.errorMessage)
      }
    }
    catch(error){
      setErrorMessage(error.errorMessage)
    }
   }
    
   const onRefresh = React.useCallback(()=>{
     setRefreshing(true);
     wait(3000).then(()=>
     setRefreshing(false));
   },[])
   

    if(currentWeather && forecast){
      const {main:{temp,humidity,pressure,feels_like,temp_max}} = currentWeather
      const {wind:{speed}} = currentWeather
      const {sys:{sunrise,sunset}} = currentWeather

       const {weather:[details]} = currentWeather
       const {description,main,icon} = details
       const {name,visibility,dt} = currentWeather
       
       const vis = visibility / 1000;
       var sut = new Date(sunrise * 1000);
       var st = new Date(sunset * 1000);

       var days = new Date(dt * 1000);
       const weekday = new Array(7);
       weekday[0] = "Sunday";
       weekday[1] = "Monday";
       weekday[2] = "Tuesday";
       weekday[3] = "Wednesday";
       weekday[4] = "Thursday";
       weekday[5] = "Friday";
       weekday[6] = "Saturday";
       
       const n = weekday[days.getDay()];

       var today = new Date();

       var months = new Date(dt * 1000);
       const month = new Array(11);
       month[0] = "Jan";
       month[1] = "Feb";
       month[2] = "Mar";
       month[3] = "Apr";
       month[4] = "May";
       month[5] = "Jun";
       month[6] = "Jul";
       month[7] = "Aug";
       month[8] = "Sep";
       month[9] = "Oct";
       month[10] = "Nov";
       month[11] = "Dec";

       
       const m = month[months.getMonth()];

       var date = today.getDate()+" "+(m)+ " "+today.getFullYear();

      
 const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
      return (
        <Fragment>
          <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing}onRefresh={onRefresh}/>
          } showsVerticalScrollIndicator={false}>
              
        <View style={styles.container}>
          
          <Image style={{width:100,height:100,marginLeft:180,marginTop:60}} source={{uri:iconUrl}}/>
         <Text style={{color:"white",marginLeft:40,marginTop:-120,fontSize:20}}>{name}</Text>
         <Text style={{color:"white",marginLeft:45,marginTop:5,fontSize:15}}>{n}</Text>
         <Text style={{color:"white",marginLeft:45,marginTop:5,fontSize:15}}>{date}</Text>
         <Text style={{color:"white",marginLeft:60,fontSize:40}}>{Math.round(temp)}°</Text>

          <View style={{backgroundColor:"#353363",width:100,padding:5,marginLeft:40,borderRadius:20,alignItems:"center",justifyContent:"center",marginTop:10}}>
        <Text style={{color:"white"}}>{main}</Text> 
          </View>

          <View>
            <MaterialCommunityIcons name="water" size={23} color="#405573" style={{marginLeft:20,marginTop:30}}/>
            <Text style={{color:"white",marginLeft:50,marginTop:-25}}>{humidity}%</Text>
          </View>

          <View style={{marginLeft:80,marginTop:-54}}>
          <MaterialCommunityIcons name="speedometer" size={23} color="#405573" style={{marginLeft:20,marginTop:30}}/>
            <Text style={{color:"white",marginLeft:50,marginTop:-26}}>{pressure} hPa</Text>
          </View>

          <View style={{marginLeft:200,marginTop:-54}}>
            <FontAwesome5 name="wind" size={23} color="#405573" style={{marginLeft:20,marginTop:30}}/>
            <Text style={{color:"white",marginLeft:55,marginTop:-26}}>{speed} km/hr</Text>
          </View>

          <View style={{marginLeft:200,marginTop:-54}}>
            <Text  style={{marginLeft:-180,marginTop:70,color:"#405573",fontSize:15}}>Feels Like</Text>
            <Text style={{color:"white",marginLeft:-69,marginTop:-26}}>{Math.round(feels_like)}° </Text>
          </View>

          <View style={{marginLeft:200,marginTop:-54}}>
            <Text  style={{marginLeft:-180,marginTop:70,color:"#405573",fontSize:15}}>Visibility</Text>
            <Text style={{color:"white",marginLeft:-69,marginTop:-26}}>{vis} Km </Text>
          </View>

          <View style={{marginLeft:200,marginTop:-54}}>
            <Text  style={{marginLeft:-180,marginTop:70,color:"#405573",fontSize:15}}>Max Temp</Text>
            <Text style={{color:"white",marginLeft:-69,marginTop:-26}}>{Math.round(temp_max)}° </Text>
          </View>
           
          <View style={{marginLeft:200,marginTop:-54}}>
            <Text  style={{marginLeft:-180,marginTop:70,color:"#405573",fontSize:15}}>Sunrise</Text>
            <Text style={{color:"white",marginLeft:-69,marginTop:-26}}>{sut.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "")} </Text>
          </View>

          <View style={{marginLeft:200,marginTop:-54}}>
            <Text  style={{marginLeft:-180,marginTop:70,color:"#405573",fontSize:15}}>Sunset</Text>
            <Text style={{color:"white",marginLeft:-69,marginTop:-26}}>{st.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "")} </Text>
          </View>

          <Text style={{color:"#405573",marginTop:60,marginLeft:20,fontSize:15}}>Today</Text>
           
          <FlatList horizontal showsHorizontalScrollIndicator={false}
          style={{marginTop:20}}
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const hourIcon = hour.item.weather[0];
              const iconUrl1 = `http://openweathermap.org/img/wn/${hourIcon.icon}@2x.png`
              var dt = new Date(hour.item.dt * 1000 );
              return <View>
                <Text style={{color:"#fff",marginLeft:20}}>{dt.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "")}</Text>
                <Image style={{width:50,height:50,marginLeft:20,marginTop:10}} source={{uri:iconUrl1}}/>
                <Text style={{color:"#fff",marginLeft:35}}>{Math.round(hour.item.temp)}°</Text>
              
              
              </View>
            }}
          />

         <FlatList 
          style={{marginTop:30}}
            data={forecast.daily.slice(1,7)}
            keyExtractor={(item, index) => index.toString()}
         
            renderItem={(daily) => {
              const dailyIcon = daily.item.weather[0];
              const iconUrl2 = `http://openweathermap.org/img/wn/${dailyIcon.icon}@2x.png`
              var dt = new Date(daily.item.dt * 1000);
              const weekday = new Array(7);
              weekday[0] = "Sun";
              weekday[1] = "Mon";
              weekday[2] = "Tue";
              weekday[3] = "Wed";
              weekday[4] = "Thu";
              weekday[5] = "Fri";
              weekday[6] = "Sat";
              
              const n = weekday[dt.getDay()];
              return <View style={{flexDirection:"row"}}>
  
              <Text style={{color:"#405573",marginLeft:20}}>{n}</Text>
              <Image style={{width:50,height:50,flex:1.5,marginLeft:50}} source={{uri:iconUrl2}}/>
              <Text style={{color:"#405573",flex:2.5,alignItems:"flex-end",marginLeft:80}}>{Math.round(daily.item.temp.max)}°</Text>
            
               <Text style={{color:"#405573",flex:2,alignItems:"flex-end"} }>{Math.round(daily.item.temp.min)}°</Text>
             </View> 
            }}
          />

     </View>

     
         
     
   
     </ScrollView>
     </Fragment>
      )
    }
    else{
      return (
        <View style={styles.container}>
         <Loader/>
        </View>
      )
    }
  
}

export default CurrentWeather

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#081a24"
  }
})
