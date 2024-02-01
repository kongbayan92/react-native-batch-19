import { useCallback, useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { ScrollView, Text, View } from "react-native";
import { List } from "react-native-paper"
import useMessage from "../../hooks/useMessage";
import { BASE_URL } from "../../settings";
import { Appbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
 
// TODO: infinite scroll
const ScreenBarangList = ({navigation}) => {
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarBarangPagination, setDaftarBarangPagination] = useState({})
  const barangSearch = useRef({value: ""})

  const onBarangList = async (params) => {
    console.log("ulala")
    const url = `${BASE_URL}/barang/`;
    const config = {
      headers: {
        Authorization: await jwt.get(),
      },
      params
    }
    http.privateHTTP.get(url, config).then((response) => {
      console.log("uyee", BASE_URL)
      const { results, ...pagination } = response.data;
      
      setDaftarBarangPagination(pagination);
      setDaftarBarang(results)
    }).catch((error) => {
      message.error(error);
    })
  }

  useEffect(() => {
    if (isFocused) {
      onBarangList()
    }
    
  }, [isFocused]);


  return (
    <>
      <View>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title="Barang" />
        <Appbar.Action icon="plus-circle-outline" onPress={() => {
          navigation.navigate('ScreenBarangCreate')
        }} />
      </Appbar.Header>
        <ScrollView>
          {daftarBarang.map((barang) => (
            <List.Item
              onPress={() => navigation.navigate("ScreenBarangDetail", {id: barang._id})}
              key={barang.id}
              title={barang.nama}
              left={props => <List.Icon {...props} icon="folder-outline" />}
            />
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default ScreenBarangList;