import React, { useCallback, useState } from "react";
import core from "../../../../src/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import CSectionModal from "../../../components/project/cSectionModal";
import { View } from "react-native";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import InfoView from "./conmponents/InfoView";
import VoteView from "./conmponents/VoteView";
import TopView from "./conmponents/TopView";
import * as controller from "./controller";
import RatingView from "./conmponents/RatingView";
import { useAgile } from "@agile-ts/react";

interface Props {}

const BringCakeEventModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  const goToAllImagesModal = (images: string[]) =>
    navigation.navigate("AllImagesModal", {
      images: images,
    });
  const goToFullDescriptionModal = (description: string) =>
    navigation.navigate("FullDescriptionModal", { description: description });

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Event
  const eventId: string | null = route.params?.eventId || null;
  const event = useAgile(core.event.EVENTS.getItemById(eventId || ""));

  // Member
  const cakeBringer = useAgile(
    core.member.MEMBERS.getItemById(event?.eventData.info.cakeBringerId)
  );
  const userMember = core.team.getUserMember(event?.teamId || "");

  const showVote =
    (userMember &&
      (!event?.eventData.info.votes.votedMemberIds ||
        !event?.eventData.info.votes.votedMemberIds.includes(userMember.id)) &&
      userMember.id !== cakeBringer?.id) ||
    false;

  const showRating =
    (userMember &&
      !showVote &&
      (!event?.eventData.info.ratings.ratedMemberIds ||
        !event?.eventData.info.ratings.ratedMemberIds.includes(
          userMember.id
        )) &&
      userMember.id !== cakeBringer?.id) ||
    false;

  //======================================================================================================================
  // On Vote
  //======================================================================================================================

  const onVote = useCallback(
    async (confirm: boolean) => {
      setIsLoading(true);
      // Vote
      const voteResponse = await controller.vote(
        event?.id || "unknown",
        userMember?.id,
        confirm,
        event?.eventData.info
      );

      // Drop Down Error
      if ("error" in voteResponse)
        DropDownHolder.dropDown?.alertWithType(
          "error",
          "Error",
          voteResponse.error.message
        );

      // Drop Down Info
      if ("info" in voteResponse)
        DropDownHolder.dropDown?.alertWithType(
          "info",
          voteResponse.info.title || "Info",
          voteResponse.info.message
        );

      // Drop Down Success
      if ("success" in voteResponse)
        DropDownHolder.dropDown?.alertWithType(
          "success",
          voteResponse.success.title || "Success",
          voteResponse.success.message
        );

      setIsLoading(false);
    },
    [userMember, event]
  );

  //======================================================================================================================
  // On Rate
  //======================================================================================================================

  const onRate = useCallback(async (rating: number) => {
    setIsLoading(true);
    // Rate
    const rateResponse = await controller.rate(
      event?.id || "unknown",
      userMember?.id,
      rating,
      event?.eventData.info
    );

    // Drop Down Error
    if ("error" in rateResponse)
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        rateResponse.error.message
      );

    // Drop Down Info
    if ("info" in rateResponse)
      DropDownHolder.dropDown?.alertWithType(
        "info",
        rateResponse.info.title || "Info",
        rateResponse.info.message
      );

    // Drop Down Success
    if ("success" in rateResponse)
      DropDownHolder.dropDown?.alertWithType(
        "success",
        rateResponse.success.title || "Success",
        rateResponse.success.message
      );

    setIsLoading(false);
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <View>
              <TopView
                description={event?.eventData.info.data.description}
                title={event?.eventData.info.data.title}
                imageIds={event?.eventData.info.data.imageIds}
                onShowAllImages={() =>
                  goToAllImagesModal(event?.eventData.info.data.imageIds)
                }
                onShowFullDescription={() =>
                  goToFullDescriptionModal(
                    event?.eventData.info.data.description
                  )
                }
              />
              <InfoView
                cakeBringerName={cakeBringer?.memberData.name || "unknown"}
                ratings={event?.eventData.info.ratings.ratingAverage}
                creationDate={core.helper.platform.date.formatDateToDeviceDateString(
                  new Date(event?.eventData.date.creationDate || new Date()),
                  "hh:mm"
                )}
              />
              <VoteView
                onConfirm={() => onVote(true)}
                onReject={() => onVote(false)}
                show={showVote}
              />
              <RatingView onRate={onRate} show={showRating} />
            </View>
          ),
        },
      ]}
      onGoBack={goBack}
      backButton
      isLoading={isLoading}
      scrollView={false}
    />
  );
};

export default BringCakeEventModal;
