import React, { useCallback, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import CSectionModal from "../../../components/project/cSectionModal";
import core from "../../../../src/core";
import VoteView from "./components/VoteView";
import TextView from "./components/TextView";
import InfoView from "./components/InfoView";
import { View } from "react-native";
import * as controller from "./controller";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import ResultView from "./components/ResultView";
import { useAgile } from "@agile-ts/react";

interface Props {}

const VoteDashEventModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  const goToFullDescriptionModal = (description: string) =>
    navigation.navigate("FullDescriptionModal", { description: description });

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Event
  const eventId: string | null = route.params?.eventId || null;
  const event = useAgile(core.event.EVENTS.getItemById(eventId || ""));

  // Member
  const dashGiver = useAgile(
    core.member.MEMBERS.getItemById(event?.eventData.info.dashGiverId)
  );
  const dashReceiver = useAgile(
    core.member.MEMBERS.getItemById(event?.eventData.info.dashReceiverId)
  );
  const userMember = core.team.getUserMember(event?.teamId || "");

  // Team
  const team = useAgile(core.team.TEAMS.getItemById(event?.teamId || ""));

  // Show Vote
  const showVote: boolean =
    (userMember &&
      (!event?.eventData.info.votes.votedMemberIds ||
        (!event?.eventData.info.votes.votedMemberIds.includes(userMember.id) &&
          userMember.id !== dashReceiver?.id &&
          userMember.id !== dashGiver?.id))) ||
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
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <View>
              <TextView
                description={event?.eventData.info.data.description}
                title={event?.eventData.info.data.title}
                onShowFullDescription={() =>
                  goToFullDescriptionModal(
                    event?.eventData.info.data.description
                  )
                }
              />
              <InfoView
                dashGiverName={dashGiver?.memberData.name || "unknown"}
                dashReceiverName={dashReceiver?.memberData.name || "unknown"}
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
              <ResultView
                confirmedVotes={event?.eventData.info.votes.confirmedVotes}
                rejectedVotes={event?.eventData.info.votes.rejectedVotes}
                neededVotes={event?.eventData.info.votes.votesNeeded}
                show={!showVote}
              />
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

export default VoteDashEventModal;
