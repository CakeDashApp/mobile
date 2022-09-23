import React, {useContext} from "react";
import core from "../../../../../../src/core";
import styled from "styled-components/native";
import ProductView from "./components/ProductView";
import MemberView from "./components/MemberView";
import { Animated, Dimensions, FlatList } from "react-native";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  memberId: string;
}

const HeaderView: React.FC<Props> = (props) => {
  // Props
  const { memberId } = props;

  // Member
  const member = useAgile(core.member.MEMBERS.getItemById(memberId));

  // User
  const user = useAgile(core.user.USERS.getItemById(member?.userId || ""));
  const theme = useContext(ThemeContext);

  // Product
  const product = useAgile(
    core.product.PRODUCTS.getItemById(member?.memberData.product.id || "")
  );

  // Scroll Data
  const scrollData: { key: number; item: any }[] = [
    {
      key: 1,
      item:
        user && member ? <MemberView user={user} member={member} /> : undefined,
    },
    {
      key: 2,
      item: member ? (
        <ProductView member={member} product={product} />
      ) : undefined,
    },
  ];

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, Dimensions.get("window").width);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  if (member) {
    return (
      <Container>
        <FlatList
          keyExtractor={(item) => item.key.toString()}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment={"center"}
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          data={scrollData}
          renderItem={(itemData) => itemData.item.item}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        />
        <DotContainer>
          {scrollData.map((data: any, i: number) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            let size = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [8, 10, 8],
              extrapolate: "clamp",
            });
            return (
              <Dot
                key={i}
                style={{ opacity: opacity, width: size, height: size }}
              />
            );
          })}
        </DotContainer>
      </Container>
    );
  }

  return null;
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  background-color: ${(props) => props.theme.colors.primary};
  padding-bottom: 20px;
`;

const DotContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
`;

const Dot = Animated.createAnimatedComponent(styled.View<{
  theme: ThemeInterface;
}>`
  background-color: ${(props) => props.theme.colors.on_primary};
  margin: 8px;
  border-radius: 100px;
`);

export default HeaderView;
