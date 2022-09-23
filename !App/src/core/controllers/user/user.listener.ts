import { USERS } from "./user.controller";
import { UserInterface } from "./user.interface";
import { sendListenerLog, sendTable } from "../../helper/general/logger.helper";
import { MEMBERS } from "../member/member.controller";

export const userListener = (ref: any) => {
  ref.on("value", (snapshot: any) => {
    // User
    const user: UserInterface = snapshot.val();
    const userId = snapshot.key;

    sendListenerLog("User Listener " + userId);
    sendTable(user);

    // Check if User Object is complete
    if (!user || !user.userData) {
      sendListenerLog("Remove User " + userId);
      USERS.remove(userId).everywhere();
      return;
    }

    // Format Fetched Values
    user.memberIds = user.memberIds || [];
    user.userData.imageId = user.userData.imageId || null;
    user.userData.badges = user.userData.badges || [];

    // Update Member Status
    updateMemberStatus(user);

    // Core
    USERS.update(userId, user);

    sendListenerLog("End User Listener");
  });
};

const updateMemberStatus = (user: UserInterface) => {
  for (let i = 0; i < user.memberIds.length; i++) {
    const member = MEMBERS.getValueById(user.memberIds[i]);
    if (member && member.memberData.status !== user.userData.status) {
      member.memberData.status = user.userData.status;
      MEMBERS.update(user.memberIds[i], member);
    }
  }
};
