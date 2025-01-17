import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Share, Linking } from 'react-native';
import Speedometer, {
  Background, Arc, Needle, Progress, Marks, Indicator, DangerPath
} from 'react-native-cool-speedometer';
import { CustomCard } from '../components/Card.js';
import { CardTitle } from '../components/CardTitle.js';
import { CardContent } from '../components/CardContent.js';
import exerciseImg from '../image/exercise2.png';
import ProgressBar from 'react-native-progress/Bar';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupModal from '../components/PopupModal';
import ManuallyCounter from '../components/ManuallyCounter';


export default function Counter(props) {
  const [completionCount, setCompletionCount] = useState(0);
  const [counter, setCounter] = useState(180); //(180 3 mins)
  const [score, setScore] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('counter');
  const [shareToken, setShareToken] = useState("");



  useEffect(() => {//gets username and token from storage
    const getUserName = async () => {
      userName.current = await AsyncStorage.getItem('userName');
      console.log('Counter userName', userName.current);
      token.current = await AsyncStorage.getItem('sessionToken');
      setShareToken(token.current);
      console.log('counter token:', token.current);
    };
    getUserName();
  }, []);

  useEffect(
    
   () => {

    const redirect = async ()=>{
    if (currentScreen == 'counter') {
      if (completionCount == 1) {
        setCurrentScreen('break');
        console.log('completionCount:', completionCount);
      }
      else if (completionCount == 2) {
        getResults();
        setCurrentScreen('result');
      }
    }
    }

    redirect();
  }, [completionCount]);

  useEffect(() => {
    counter > 0 && setTimeout(() => {
      //completionCount is how many timme the user have done 30 steps. In This case, after the first 30 steps the progress bar keep progressing
      if (currentScreen == 'break') {
        if (counter == 1) {
          setCurrentScreen('counter');
          setStepCount(0);
        }
        setCounter(counter - 1);
      }
    }, 1000);
  }, [counter, currentScreen]);

  const clockify = () => {
    let hours = Math.floor(counter / 60 / 60);
    let mins = Math.floor(counter / 60 % 60);
    let seconds = Math.floor(counter % 60);

    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySeconds,
    };
  };

  //fetch to post the counter step results
  const customer = useRef();
  const startTime = useRef(0);
  const stopTime = useRef(0);
  const testTime = useRef(0);
  const token = useRef("");
  const userName = useRef("");


  const savingSteps = async (event) => {
    //how to get startime, stepPoints, StopTime, TestTime
    let stepPoints = [];
    const lastStep = steps.current[29];
    const firstStep = steps.current[0];
    stopTime.current = lastStep.time;

    testTime.current = lastStep.time - firstStep.time;

    let previousTime = startTime.current;

    stepPoints = [];
    steps.current.forEach(stepObject => {
      const stepTime = stepObject.time - previousTime;
      previousTime = stepObject.time;
      stepPoints.push(stepTime);
    });

    try {

      console.log('token:', token.current);
      await fetch('https://dev.stedi.me/rapidsteptest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'suresteps.session.token': token.current
        },
        body: JSON.stringify({
          customer: userName.current,
          startTime: startTime.current,
          stepPoints,
          stopTime: stopTime.current,
          testTime: testTime.current,
          totalSteps: 30
        })
      })
    }
    catch (error) {
      console.log('save error', error);
    }
  }

  //Get the results of the counter

  const getResults = async () => {

    try {
      console.log('UserName:' + userName.current);
      console.log('Token before calling score:' + token.current);
      const scoreResponse = await fetch('https://dev.stedi.me/riskscore/' + userName.current, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'suresteps.session.token': token.current
        }
      })
      console.log(`Response status: ${scoreResponse.status}`);
      const scoreText = await scoreResponse.text();
      console.log(`Response text: ${scoreText}`)
      const scoreObject = await scoreResponse.json();
      console.log("score:", scoreObject.score);
      setScore(scoreObject.score);

    } catch (error) {
      console.log('score error', error);
    }
  }


  //outcome of the saving data
  const outcome = () => {
    if (score >= 10) {
      return ("Excellent improvement")
    } else if (score > 0 && score < 10) {
      return ('Some improvement');
    }
    else if (score < 0 && score > -10) {
      return ('Noticeable deterioration');
    }
    else if (score <= -10) {
      return ("severe deterioration")
    }
  }
  //message od the saving data

  const messageOutcome = () => {
    if (score >= 10) {
      return ("maintain your progress through regular exercise.*")
    } else if (score > 0 && score < 10) {
      return ('increase your progress through regular exercise.*');
    }
    else if (score < 0 && score > -10) {
      return ('make progress through regular exercise.*');
    }
    else if (score <= -10) {
      return ("make a comeback through regular exercise.*")
    }
  }
  //close button
  const close = () => {
    setCompletionCount(0);
    setCurrentScreen('counter');
    setStepCount(0);
    setCounter(180);
  }

  //share 

  const shareProgress = async () => {
    const shareOptions = {
      message: 'This is a test'
    }
    try {
      const shareResponse = await Share.share(shareOptions)
      console.log(shareResponse);
    }
    catch (error) {
      console.log('Error', error)
    }
  }
  const data = useRef({
    x: 0,
    y: 0,
    z: 0,
  });
  // const startTime = new Date().getTime();
  const [subscription, setSubscription] = useState(null);
  const recentAccelerationData = useRef([]);//useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
  const steps = useRef([]);//useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
  const [stepCount, setStepCount] = useState(0);


  const _subscribe = () => {
    setSubscription(true)
    startTime.current = new Date().getTime();
    setStepCount(0);
    recentAccelerationData.current = [];
    steps.current = [];
  };

  const tallyLatestSteps = async () => {
    steps.current = steps.current.concat([{ time: new Date().getTime() }]);
    // console.log("Steps after: "+steps.current.length);
    if (steps.current.length >= 30) {
      console.log("_unsubscribe");
      setStepCount(0);
      await savingSteps();
      _unsubscribe();
      setCompletionCount(completionCount + 1);
      console.log('completationCount:', completionCount);
    } else {
      setStepCount(steps.current.length);
    }

  }



  const _unsubscribe = () => {
    // tallyLatestSteps();//count the last remaining steps before unsubscribing
    subscription && setSubscription(false);
    console.log("_")
    setSubscription(null);
  };

  useEffect(() => {
    //_subscribe();
    steps.current = [];
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data.current;
  //console.log("x: "+x+" y:"+y+" z:"+z);
  let total_amount_xyz = Math.sqrt(x * x + y * y + z * z) * 9.81;

  //circula process bar
  console.log(stepCount, "stepCount");



  if (currentScreen === 'counter') {

    return (
      <View style={styles.screen}>
        <CustomCard style={{
          backgroundColor: 'white', borderRadius: 10, marginTop: 10, marginBottom: 10, width: 340, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4
        }}>
          <CardTitle style={styles.titleText}
            subtitle={'Steps'}
            title={stepCount}
          />
          <ManuallyCounter visible={subscription} tallyLatestSteps={tallyLatestSteps} />
          {/* <PopupModal shareToken={shareToken}/> */}

          <TouchableOpacity
            onPress={_unsubscribe}
            style={styles.cancelButton} >
            <Icon name={'close-circle'} color='red' size={45} />
          </TouchableOpacity>

          <Image source={exerciseImg} style={styles.image} ></Image>
          <CardContent>
            {/* <Text style={styles.text}>Step Quickly</Text> */}
            <TouchableOpacity
              onPress={subscription ? _unsubscribe : _subscribe}
              style={styles.button}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>{subscription ? 'Stop' : 'Go'}</Text>
            </TouchableOpacity>

          </CardContent>
          <ProgressBar progress={(stepCount * 0.50 / 30) + (completionCount * 0.50)} width={300} height={25} color={'#A0CE4E'} style={styles.bar} />
        </CustomCard>
      </View>
    );

  }

  else if (currentScreen === 'break') {
    return (
      <View style={styles.screen}>
        <Card style={{
          backgroundColor: '#D9F2AD', borderRadius: 10, marginTop: 20, marginBottom: 20, width: 320, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4
        }}>
          <FontAwesome5 name='redo' color='red' size={20} style={{ alignSelf: 'flex-end', marginTop: 30, paddingRight: 15, position: 'absolute' }} />
          <CardTitle style={{ marginLeft: 10, marginTop: 40 }}
            subtitle='Take a break for 3 mins'
          />
          <Text style={{ fontSize: 50, fontWeight: 'bold', marginLeft: 60, marginBottom: 25 }}>{clockify().displayHours}:{clockify().displayMins}:{clockify().displaySeconds}</Text>
          <CardContent>
            {/* <TouchableOpacity disabled={true} 
     onPress={ ()=>setTimerOn(current => !current,  subscription ? _unsubscribe : _subscribe )}
    //  {subscription ? _unsubscribe : _subscribe}
     style={{marginTop:50,  width: 200, height: 35, borderRadius: 100, backgroundColor: 'gray', alignItems: 'center', marginLeft:50, marginTop:120, padding:7}}>
     <Text>{subscription ? 'Stop' : 'GO'}</Text>
    </TouchableOpacity> */}
            <ProgressBar progress={(stepCount * 0.50 / 30) + (completionCount * 0.50)} width={300} height={25} color={'#A0CE4E'} style={styles.bar2} />
          </CardContent>
        </Card>

      </View>

    );

  } else if (currentScreen == 'result') {
    return (
      <View style={styles.screen}>
        <Card style={{
          backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 20, width: 320, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4
        }}>
          <TouchableOpacity onPress={shareProgress} style={{ zIndex: 1 }}>
            <FontAwesome5 name='share-alt' color='#B4B4B4' size={20} style={{ marginTop: 20, paddingLeft: 280, position: 'absolute' }} />
          </TouchableOpacity>
          <CardContent style={{ marginTop: 60, marginLeft: 20 }}>
            <Speedometer width={250}
              value={score}
              max={100}
              min={-100} >
              <Background color='#A0CE4E' />
              <Arc />
              <Needle circleColor='#A0CE4E' />
              <Progress color='#A0CE4E' />
              <Marks />
              <Indicator />
            </Speedometer>

            <CardTitle titleStyle={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}
              subtitleStyle={{ fontSize: 18, color: 'black', textAlign: 'center' }}
              title={outcome()}
              subtitle={messageOutcome()}
            />
            <TouchableOpacity
              onPress={close}
              style={styles.button2}>
              <Text>close</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', color: '#0000EE' }} onPress={() => Linking.openURL("https://www.stedibalance.com/understand-and-strengthen-your-balance/")}>More info</Text>
          </CardContent>
        </Card>
      </View>
    );

  }


}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 10,
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 100,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#A0CE4E',
    marginLeft: 100,
  },
  text: {
    textAlign: 'center',
    marginBottom: 2
  },
  image: {
    width: 125,
    height: 300,
    marginLeft: 100,
    marginBottom: 20,
    marginTop: -150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 20,

  },
  bar2: {
    marginLeft: -5

  },
  button2: {
    marginTop: 10,
    marginBottom: 20,
    width: 170,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#A0CE4E',
    marginLeft: 50
  },
  titleText: {
    marginTop: -10,
  }

});
