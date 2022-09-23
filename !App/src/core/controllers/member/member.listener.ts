import { MEMBERS } from "./member.controller";
import { MemberInterface } from "./member.interface";

import { sendListenerLog, sendTable } from "../../helper/general/logger.helper";

export const memberListener = (ref: any) => {
  ref.on("value", (snapshot: any) => {
    // Member
    const member: MemberInterface = snapshot.val();
    const memberId = snapshot.key;

    sendListenerLog("Member Listener " + memberId);
    sendTable(member);

    // Check if Member Object is complete
    if (
      !member ||
      !member.memberData ||
      !member.memberData.product ||
      !member.memberData.stats
    ) {
      sendListenerLog("Remove Member " + memberId);
      MEMBERS.remove(memberId).everywhere();
      return;
    }

    // Format Fetched Values
    member.memberData.imageId = member.memberData.imageId || null;
    member.cakeIds = member.cakeIds || [];
    member.eventIds = member.eventIds || [];
    member.memberData.product.id = member.memberData.product.id || null;
    member.memberData.status =
      MEMBERS.getValueById(memberId)?.memberData.status || "offline";

    // Core
    MEMBERS.update(memberId, member);

    sendListenerLog("End Member Listener");
  });
};
