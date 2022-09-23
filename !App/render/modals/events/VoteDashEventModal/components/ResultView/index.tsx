import React, {useContext, useEffect, useRef, useState} from "react";
import styled from "styled-components/native";
import CSlider from "../../../../../components/project/cSlider";
import TableOfContentItem from "./components/TableContentItem";
import CText from "../../../../../components/default/cText";
import strings from "./strings";
import * as Animatable from "react-native-animatable";
import { View } from "react-native";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  neededVotes: number;
  confirmedVotes: number;
  rejectedVotes: number;
  show: boolean;
}

const ResultView: React.FC<Props> = (props) => {
  // Props
  const { neededVotes, confirmedVotes, rejectedVotes, show } = props;
  const totalVotes = confirmedVotes + rejectedVotes;

  // Theme
  const theme = useContext(ThemeContext);

  // Show
  const [showResult, setShowResult] = useState<boolean>(show);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Vote Animation
  const resultAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (show) {
        setShowResult(true);
        // @ts-ignore
        await resultAnimation.current?.bounceIn();
      } else {
        // @ts-ignore
        await resultAnimation.current?.bounceOut();
        setShowResult(false);
      }
    };

    Animation();
  }, [show]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Animatable.View ref={resultAnimation}>
      {showResult && (
        <Container>
          <CText color={theme.colors.on_surface} size={20} bold>
            {totalVotes > 0
              ? strings()
                  .resultTitleMembersVoted.replace(
                    "${members}",
                    totalVotes.toString()
                  )
                  .replace("${s}", totalVotes === 1 ? "" : "s")
                  .replace(
                    "${has}",
                    totalVotes === 1 ? strings().hasText : strings().haveText
                  )
              : strings().resultTitleNoMemberVoted}
          </CText>
          <CSlider
            endValue={neededVotes}
            sliders={[
              {
                currentValue: confirmedVotes,
                color: "#5DB8FE",
              },
              {
                currentValue: rejectedVotes,
                color: "#E55D5D",
              },
            ]}
            backgroundColor={theme.colors.on_surface_3}
          />
          <TableContentContainer>
            <TableOfContentItem
              color={"#5DB8FE"}
              text={strings().confirmedMembersTableContentText}
            />
            <TableOfContentItem
              color={"#E55D5D"}
              text={strings().rejectedMembersTableContentText}
            />
            <TableOfContentItem
              color={theme.colors.on_surface_3}
              text={strings().neededVotesTableContentText}
            />
          </TableContentContainer>
        </Container>
      )}
    </Animatable.View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin-top: 20px;
`;

const TableContentContainer = styled.View`
  margin-top: 10px;
`;

export default ResultView;
