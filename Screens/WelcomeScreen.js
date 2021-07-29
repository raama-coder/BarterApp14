import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../Config';
import firebase from 'firebase';

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNo: '',
      address: '',
      confirmPassword: '',
      isModalVisible: false,
      currencyCode: '',
    };
  }
  userSignUp = (email, password, confirmPassword) => {
    if (password == confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('Users').add({
            FirstName: this.state.firstName,
            LastName: this.state.lastName,
            Email: this.state.email,
            PhoneNo: this.state.phoneNo,
            Address: this.state.address,
            CurrencyCode: this.state.currencyCode,
          });
          return Alert.alert('User has been added succesfully', '', [
            {
              text: 'OK',
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch(function (error) {
          Alert.alert(error);
        });
    } else {
      Alert.alert("Password doesn't match \n please check your password");
    }
  };

  userLogIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        Alert.alert('User has been Logged in succesfully');
        this.props.navigation.navigate('Home');
      })
      .catch(function (error) {
        Alert.alert(error);
      });
  };

  showModal = () => {
    return (
      <Modal
        visible={this.state.isModalVisible}
        animationType="fade"
        transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.keyboardContainer}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.modalInput}
                placeholder={'Enter First Name'}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
                maxLength={30}></TextInput>

              <TextInput
                style={styles.modalInput}
                placeholder={'Enter Last Name'}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
                maxLength={10}></TextInput>

              <TextInput
                style={styles.modalInput}
                placeholder={'Phone Number'}
                onChangeText={(text) => {
                  this.setState({ phoneNo: text });
                }}
                maxLength={10}
                keyboardType={'numeric'}></TextInput>

              <TextInput
                style={styles.modalInput}
                placeholder={'Address'}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
                multiline="true"></TextInput>

              <TextInput
                style={styles.modalInput}
                placeholder={'Email'}
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
                keyboardType={'email-address'}></TextInput>

              <TextInput
                style={styles.modalInput}
                placeholder={'Password'}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                maxLength={30}
                secureTextEntry={true}></TextInput>

              <TextInput
                style={styles.modalInput}
                placeholder={'Confirm Password'}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
                maxLength={30}
                secureTextEntry={true}></TextInput>

              <TextInput
                style={styles.modalInput}
                placeholder={'Currency Code'}
                onChangeText={(text) => {
                  this.setState({ currencyCode: text });
                }}
                maxLength={30}
                secureTextEntry={true}></TextInput>

              <View>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.userSignUp(
                      this.state.email,
                      this.state.password,
                      this.state.confirmPassword
                    );
                    Alert.alert('You have been registered');
                  }}>
                  <Text>Register</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.showModal()}
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Barter App</Text>
          <Image style={styles.img} source={require('../assets/Barter.png')} />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Email"
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
            keyboardType="email-address"></TextInput>

          <TextInput
            style={styles.inputBox}
            placeholder="Enter Password"
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            secureTextEntry={true}></TextInput>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}>
            <Text style={styles.btntxt}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.userLogIn(this.state.email, this.state.password);
            }}>
            <Text style={styles.btntxt}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { height: 700 },
  subContainer: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 30, fontWeight: '500', color: '#E35D20' },
  inputBox: {
    width: 300,
    height: 50,
    borderWidth: 5,
    paddingLeft: 8,
    fontSize: 20,
    borderColor: 'black',
    marginTop: 10,
    borderRadius: 10,
  },
  btn: {
    width: 200,
    height: 50,
    justfyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderRadius: 25,
    margin: 10,
  },
  btntxt: { fontSize: 20, fontWeight: '900', paddingTop: 10 },
  img: { width: 333, height: 206, alignSelf: 'center' },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 28,
    color: '#E35D20',
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 30,
    backgroundColor: 'white',
  },
  modalInput: {
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 5,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    backgroundColor: '#C3CC79',
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 2,
    fontSize: 20,
    font: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#DD741E',
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 2,
    fontSize: 20,
    font: 'bold',
    color: '#FFFFFF',
  },
});
