import { AsyncStorage } from 'react-native';
import Buffer1 from 'buffer'; 

const saveImage = async (image) => {
    try{
        const imgabuffer = await Buffer1.Buffer(image);
        const imgajson = await imgabuffer.toJSON();
        await AsyncStorage.setItem('@image',imgajson);
        console.log(imgajson);
        return 'THANH_CONG';
       
    } catch (e) {
        return e;
    }
} 

export default saveImage;