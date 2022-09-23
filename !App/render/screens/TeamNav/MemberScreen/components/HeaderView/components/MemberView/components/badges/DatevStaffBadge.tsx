import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";
import CImage from "../../../../../../../../../components/default/cImage";

interface Props {}

const DatevStaffBadge: React.FC<Props> = (props) => {
  // Image
  const [datevLogoPath] = useState(
    require("../../../../../../../../../../assets/images/datevLogo.png")
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={() => Toast.show("Datev Staff")}>
      <CImage
        source={datevLogoPath}
        width={20}
        height={20}
        resizeMode={"contain"}
      />
    </TouchableOpacity>
  );
};

export default DatevStaffBadge;
