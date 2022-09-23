import React, {ReactElement} from "react";
import {Text, View} from 'react-native';
import {IconProps} from "./interface/icon-constants.interface";
import Home from "./icons/Home";
import Cake from "./icons/Cake";
import ChevronLeft from "./icons/ChevronLeft";
import ChevronRight from "./icons/ChevronRight";
import Compass from "./icons/Compass";
import Settings from "./icons/Settings";
import User from "./icons/User";
import Check from "./icons/Check";
import Plus from "./icons/Plus";
import Save from "./icons/Save";
import Pen from "./icons/Pen";
import Search from "./icons/Search";
import Lock from "./icons/Lock";
import Mail from "./icons/Mail";
import EyeOff from "./icons/EyeOff";
import Eye from "./icons/Eye";
import Cross from "./icons/Cross";
import Repeat from "./icons/Repeat";
import CheckCircle from "./icons/CheckCircle";
import CrossCircle from "./icons/CrossCircle";
import Refresh from "./icons/Refresh";
import Trash from "./icons/Trash";
import ChevronDown from "./icons/ChevronDown";
import ChevronUp from "./icons/ChevronUp";
import Users from "./icons/Users";
import ArrowRightCircle from "./icons/ArrowRightCircle";
import More from "./icons/More";
import Crown from "./icons/Crown";
import Star from "./icons/Star";
import InformationCircle from "./icons/InformationCircle";
import TrendingUp from "./icons/TrendingUp";
import SmartPhone from "./icons/SmartPhone";
import Moon from "./icons/Moon";
import Image from "./icons/Image";
import Feather from "./icons/Feather";
import FileText from "./icons/FileText";
import BarChart from "./icons/BarChart";
import Book from "./icons/Book";
import Copy from "./icons/Copy";
import Sliders from "./icons/Sliders";
import XSquare from "./icons/XSquare";
import {iconTypesInterface} from "./interface/icon-types.interface";
import UserPlus from "./icons/UserPlus";
import Zap from "./icons/Zap";
import CPU from "./icons/CPU";


interface MainIconProps extends IconProps {
    type: iconTypesInterface,
    style?: object,
}


const CIcon: React.FC<MainIconProps> = (props) => {

    // Props
    const {style, type} = props;


    //========================================================================================================================
    // Icon KeyMap
    //========================================================================================================================

    const iconKeyMap: { [key: string]: ReactElement } = {
        home: <Home {...props} />,
        cake: <Cake {...props}/>,
        chevronLeft: <ChevronLeft {...props} />,
        chevronRight: <ChevronRight {...props} />,
        chevronDown: <ChevronDown {...props} />,
        chevronUp: <ChevronUp {...props} />,
        arrowRightCircle: <ArrowRightCircle {...props} />,
        compass: <Compass {...props} />,
        settings: <Settings {...props} />,
        user: <User {...props} />,
        users: <Users {...props} />,
        check: <Check {...props} />,
        checkCircle: <CheckCircle {...props} />,
        plus: <Plus {...props} />,
        save: <Save {...props} />,
        pen: <Pen {...props} />,
        search: <Search {...props} />,
        lock: <Lock {...props} />,
        mail: <Mail {...props} />,
        eyeOff: <EyeOff {...props} />,
        eye: <Eye {...props} />,
        cross: <Cross {...props} />,
        crossCircle: <CrossCircle {...props} />,
        informationCircle: <InformationCircle {...props} />,
        repeat: <Repeat {...props} />,
        refresh: <Refresh {...props} />,
        trash: <Trash {...props} />,
        more: <More {...props} />,
        crown: <Crown {...props} />,
        star: <Star {...props} />,
        trendingUp: <TrendingUp {...props}/>,
        smartPhone: <SmartPhone {...props}/>,
        moon: <Moon {...props}/>,
        image: <Image {...props}/>,
        feather: <Feather {...props}/>,
        fileText: <FileText {...props}/>,
        barChart: <BarChart {...props}/>,
        book: <Book {...props}/>,
        copy: <Copy {...props}/>,
        sliders: <Sliders {...props}/>,
        xSquare: <XSquare {...props}/>,
        userPlus: <UserPlus {...props}/>,
        zap: <Zap {...props}/>,
        cpu: <CPU {...props}/>
    }


    //========================================================================================================================
    //Render
    //========================================================================================================================

    return (
        <View style={style}>
            {iconKeyMap[type] || <Text>No valid type!</Text>}
        </View>
    );
}

export default CIcon;
