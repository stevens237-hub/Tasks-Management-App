import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
  getNotificationsList,
  getTeamList,
  markNotificationRead,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/get-team", protect, getTeamList);
router.get("/notifications", protect, getNotificationsList);

router.put("/profile", protect, updateUserProfile);
router.put("/read-noti", protect, markNotificationRead);
router.put("/change-password", protect, changeUserPassword);

// //   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;