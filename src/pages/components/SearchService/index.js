import { color, font_Size } from '../../../constants/theme.js'
export const styles = {
    container:{
        flex:1,
        flexDirection:"row",
        gap:10,
        borderWidth:1,
        borderColor:color.gray4,
        marginTop:5,
        marginBottom:5,
        borderRadius:10
    },

    infor1:{
        flexDirection:'column',
        justifyContent:'center'
    },
    titlemecanico:{
        fontSize:font_Size.lg,
    },
    subtitle:{
        fontSize:font_Size.sm,
        color:color.gray3
    },
    img:{
        width:100,
        height:100
    }
}