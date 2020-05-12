import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, TextInput, Image, Button, StatusBar } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import FireFunctions from "../config/FireFunctions";
import * as firebase from 'firebase'
import * as ImagePicker from "expo-image-picker";

export default class addProductScreen extends React.Component {
  state = {
    username: '', password: '', email: '', adress: '', image: null, phone_number: ''
  };

  componentDidMount() {
    this.getPhotoPermission();
  }
  //Permissão para camera 
  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("We need permission to use your camera roll if you'd like to incude a photo.");
      }
    }
  };

  handleCreate = () => {
    FireFunctions.shared
      .addUser({ username: this.state.username.trim(), phone_number: this.state.phone_number.trim(), email: this.state.email.trim(), password: this.state.password.trim(), adress: this.state.adress.trim(), localUri: this.state.image })
      .then(ref => {
        this.setState({ username: "", image: null, password: "", email: "", adress: "", phone_number: "" });
        this.props.navigation.push('Home');
      })
      .catch(error => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View>
            {this.state.image ? (
              <Image
                source={{ uri: this.state.image }}
                style={{ width: '100%', height: 300 }}
              />
            ) : (
                <TouchableOpacity onPress={this.pickImage}>
                  <Image style={styles.ButtonImg} source={require('../../assets/add_p.png')} />
                </TouchableOpacity>
              )}


            <View style={styles.filds}>


              <Text style={styles.Tittle} >Crie sua conta</Text>

              <TextInput
                placeholder="email@exemple.com"
                keyboardType="email-address"
                blurOnSubmit={false}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputEmail}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />

              <TextInput
                style={styles.inputName}
                placeholder="Nome"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />

              <TextInput
                style={styles.inputPhone}
                value={this.state.phone_number}
                placeholder="Telefone"
                maxLength={11}
                keyboardType='phone-pad'
                autoCompleteType='cc-number'
                autoCorrect={false}
                onChangeText={phone_number => this.setState({ phone_number })}
              />

              <TextInput
                style={styles.inputadress}
                value={this.state.ph}
                placeholder="Endereço"
                autoCorrect={false}
                onChangeText={adress => this.setState({ adress })}
              />


              <TextInput
                style={styles.inputPassword}
                placeholder="Senha"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />

              <View style={styles.ButtonSend}>
                <Button
                  status='success'
                  title='Cadastrar'
                  onPress={this.handleCreate}
                  disabled={
                    this.state.image && this.state.username && this.state.adress && this.state.password && this.state.email && this.state.phone_number
                      ? false
                      : true
                  }>
                </Button>

              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center'
  },
  filds: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginBottom: 40
  },
  Tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20
  },
  ButtonImg: {
    marginBottom: 100,
    alignSelf: 'center',
    width: 100,
    height: 100
  },
  ButtonSend: {
    marginTop: 20
  },
  inputName: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
  },
  inputEmail: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
  },
  inputPhone: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
  },
  inputadress: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
  }

});






















