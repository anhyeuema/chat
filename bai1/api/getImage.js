import { AsyncStorage } from 'react-native';

const getImage = async () => {
    try{
        const imgajson = await AsyncStorage.getItem('@image');
        if ( imgajson !== null){
          return await value;
        }
        return ';'
    } catch (e) {
        return '';
    }
} 

export default getImage;