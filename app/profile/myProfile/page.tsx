"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import { useGetMyProfileDataAPI } from "../hook";
import { Box } from "@mui/material";
import UserProfileAvater from "../components/userProfileAvater";
import ShowUserProfilePic from "../components/showUserProfilePic";
import getCroppedImg from "../helpers/getCroppedImg";
import CropProfileImage from "../components/cropProfileImage";
import SelectOrDeletePicModal from "../components/selectOrDeletePicModal";
import {
  getMyProfileDataApi,
  profileDeleteAvatar,
  profileUploadAvatar,
} from "../api";
import { updateSendUserProfileDataToServer } from "@/providers/Redux/user/userSlice";
import ProfileInputs from "../components/profileInputsInfo";
import { MyProfileData } from "./myProfile.interface";
import { isEmail, isIranPhoneNumber } from "@/modules/helper";
import LottieLoading from "@/components/lottieLoading";
import CommonSuccessSnackBar from "../components/successSnackbar";

function MyProfilePage() {
  const dispatch = useDispatch();
  const imageInputRef = useRef<null>(null);
  const selectImageViaModal: any = useRef(null);
  const { id, sendUserProfileDataToServer } = useSelector(
    (state: RootReduxState) => state.user
  );
  // const { mutate: mutateMyProfile, isPending: profileDataLoading } =
  //   useGetMyProfileDataAPI();
  // const getMyProfileData = queryClient.getQueryData<MyProfileData>([
  //   "my-profile-data",
  // ]);
  // useEffect(() => {
  //   if (!getMyProfileData) {
  //     mutateMyProfile();
  //   }
  //   return () => {};
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getMyProfileData]);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFullProfilePic, setOpenFullProfilePic] = useState<boolean>(false);
  const [rotationState, setRotationState] = useState<number>(0);
  const [selectPic, setSelectPic] = useState<boolean>(false);
  const [initialSelectedPic, setInitialSelectedPic] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [stableRecievedImage, setStableRecievedImage] = useState<string | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userInputsInfo, setUserInputsInfo] = useState({
    myId: null,
    myName: "",
    myUserName: "",
    myEmail: "",
    myPhone: "",
    profileLoading: true,
    pendingVerification: [],
  });
  const [userUnchangableInfo, setUserUnchangableInfo] = useState({
    unchangableId: null,
    unchangableName: "",
    unchangableUserName: "",
    unchangableEmail: "",
    unchangablePhone: "",
  });

  useEffect(() => {
    getMyProfileDataApi({})
      .then((res) => {
        const verifyPhone = res.data?.pending_verification?.filter(
          (item: any) => item?.data?.type === "phone"
        );
        const verifyEmail = res.data?.pending_verification?.filter(
          (item: any) => item?.data?.type === "email"
        );
        // console.log(verifyPhone, verifyEmail);
        setUserImage(res.data?.profile_data?.data?.profile_pic);
        setStableRecievedImage(res.data?.profile_data?.data?.profile_pic);
        setUserInputsInfo((prev) => ({
          ...prev,
          myId: res.data?.profile_data?.data?.id,
          myName: res.data?.profile_data?.data?.name || "",
          myUserName: res.data?.profile_data?.data?.username || "",
          myEmail:
            verifyEmail[0]?.data?.value ||
            res.data?.profile_data?.data?.email ||
            "",
          myPhone:
            verifyPhone[0]?.data?.value ||
            res.data?.profile_data?.data?.phone ||
            "",
          pendingVerification: res.data?.pending_verification,
          profileLoading: false,
        }));
        setUserUnchangableInfo((prev) => ({
          ...prev,
          unchangableId: res.data?.profile_data?.data?.id,
          unchangableName: res.data?.profile_data?.data?.name || "",
          unchangableUserName: res.data?.profile_data?.data?.username || "",
          unchangableEmail:
            verifyEmail[0]?.data?.value ||
            res.data?.profile_data?.data?.email ||
            "",
          unchangablePhone:
            verifyPhone[0]?.data?.value ||
            res.data?.profile_data?.data?.phone ||
            "",
        }));
      })
      .catch((err) => {
        // console.log(err);
        setUserInputsInfo((prev) => ({
          ...prev,
          profileLoading: false,
        }));
      });
  }, []);

  ////////////////////
  ///////////////////
  ////////////////////

  const [getImageDirectly, setGetImageDirectly] = useState();
  function handleSelectImage(e: any) {
    setInitialSelectedPic("");
    if (e.target.value === "") {
      return;
    } else {
      if (e && e.target.files[0]) {
        const arr = e.target.files[0].name.split(".");
        const docPostFix = arr[arr.length - 1].toLowerCase();
        if (
          docPostFix === "jpg" ||
          docPostFix === "jpeg" ||
          docPostFix === "png"
        ) {
          setGetImageDirectly(e.target.files[0]);
          setOpenModal(true);
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            // setUserImage(reader.result);
            setInitialSelectedPic(reader.result);
          };
        } else {
          // console.log(`${docPostFix} is wrong`);
        }
      }
    }
  }
  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  /** Gets Croped image from the server**/
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage2 = await getCroppedImg(
        initialSelectedPic,
        croppedAreaPixels,
        rotationState
      );

      setUserImage(croppedImage2);
      handleCloseSelectPic();
      handleCloseFullProfilePicModal();
      handleCloseModal();
      setRotationState(0);
      setZoom(1);
      // setInitialSelectedPic("");
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);
  /********************/
  function handleCloseModal() {
    setOpenModal(false);
    setRotationState(0);
    setZoom(1);
  }

  function openSelectPicInDarkModal() {
    selectImageViaModal.current.click();
  }

  function handleDelPicInDarkModal() {
    setOpenModal(false);
    setSelectPic(false);
    setOpenFullProfilePic(false);
    setUserImage(null);
    setRotationState(0);
    setZoom(1);
    // setInitialSelectedPic("");
  }

  const handleCloseSelectPic = () => {
    setSelectPic(false);
    setRotationState(0);
    setZoom(1);
    // setInitialSelectedPic("");
  };
  const handleOpenSelectPic = () => {
    setSelectPic(true);
  };
  function openInput() {
    imageInputRef?.current?.click();
  }

  function handleOpenFullProfilePicModal() {
    setOpenFullProfilePic(true);
  }

  const handleCloseFullProfilePicModal = () => {
    setOpenFullProfilePic(false);
  };

  const [errorStates, setErrorStates] = useState({
    nameError: false,
    nameErrorCaption: "",
    userNameError: false,
    userNameErrorCaption: "",
    emailError: false,
    emailErrorCaption: "",
    phoneError: false,
    phoneErrorCaption: "",
  });
  useEffect(() => {
    if (sendUserProfileDataToServer) {
      // console.log(sendUserProfileDataToServer);

      if (
        userInputsInfo.myName?.length > 2 ||
        userInputsInfo.myName?.length === 0
      ) {
      } else {
        // console.log("name is not valid");
        setErrorStates((prev) => ({
          ...prev,
          nameError: true,
          nameErrorCaption: "نام وارد شده باشد شامل حداقل 3 حرف باشد",
        }));
        dispatch(updateSendUserProfileDataToServer(false));
      }

      if (userInputsInfo.myPhone?.length > 0) {
        if (!isIranPhoneNumber(userInputsInfo.myPhone)) {
          // console.log("phone number is not valid");
          setErrorStates((prev) => ({
            ...prev,
            phoneError: true,
            phoneErrorCaption: "شماره وارد شده صحیح نیست, مجددا بررسی کنید",
          }));
          dispatch(updateSendUserProfileDataToServer(false));
        }
      }
      if (userInputsInfo.myEmail?.length > 0) {
        if (!isEmail(userInputsInfo.myEmail)) {
          // console.log("email is not valid");
          setErrorStates((prev) => ({
            ...prev,
            emailError: true,
            emailErrorCaption: "ایمیل وارد شده صحیح نیست, مجددا بررسی کنید",
          }));
          dispatch(updateSendUserProfileDataToServer(false));
        }
      }

      if (
        userUnchangableInfo.unchangablePhone === userInputsInfo.myPhone &&
        userUnchangableInfo.unchangableEmail === userInputsInfo.myEmail &&
        userUnchangableInfo.unchangableUserName === userInputsInfo.myUserName &&
        userUnchangableInfo.unchangableName === userInputsInfo.myName
      ) {
        // console.log("nothing has changed");
        dispatch(updateSendUserProfileDataToServer(false));
      } else {
        if (
          (isIranPhoneNumber(userInputsInfo.myPhone) ||
            userInputsInfo.myPhone?.length === 0 ||
            userInputsInfo.myPhone?.length === undefined) &&
          (isEmail(userInputsInfo.myEmail) ||
            userInputsInfo.myEmail?.length === 0 ||
            userInputsInfo.myEmail?.length === undefined) &&
          (userInputsInfo.myName?.length > 2 ||
            userInputsInfo.myName?.length === 0)
        ) {
          // console.log("send data to server");
          setUserInputsInfo((prev) => ({ ...prev, profileLoading: true }));
          dispatch(updateSendUserProfileDataToServer(false));
          getMyProfileDataApi({
            updated_data: {
              email: userInputsInfo.myEmail,
              phone: userInputsInfo.myPhone,
              username: userInputsInfo.myUserName,
              name: userInputsInfo.myName,
            },
          })
            .then((res) => {
              const verifyPhone = res.data?.pending_verification?.filter(
                (item: any) => item?.data?.type === "phone"
              );
              const verifyEmail = res.data?.pending_verification?.filter(
                (item: any) => item?.data?.type === "email"
              );
              setUserInputsInfo((prev) => ({
                ...prev,
                profileLoading: false,
                pendingVerification: res?.data?.pending_verification,
                // myId: res.data?.profile_data?.data?.id,
                myName: res.data?.profile_data?.data?.name || "",
                // myUserName: res.data?.profile_data?.data?.username || "",
                // ایمیلی که میخوایم باشه رو با رنگ قرمز نشون میده که نباید با رنگ قرمز نشون بده تلفن هم همینطور
                // myEmail:
                //   verifyEmail[0]?.data?.value ||
                //   res.data?.profile_data?.data?.email ||
                //   "",
                // myPhone:
                //   verifyPhone[0]?.data?.value ||
                //   res.data?.profile_data?.data?.phone ||
                //   "",
                myEmail:
                  userInputsInfo?.myEmail?.length === 0 ||
                  userInputsInfo?.myEmail?.length === undefined
                    ? userUnchangableInfo?.unchangableEmail
                    : userInputsInfo.myEmail,
                myPhone:
                  userInputsInfo?.myPhone?.length === 0 ||
                  userInputsInfo?.myPhone?.length === undefined
                    ? userUnchangableInfo?.unchangablePhone
                    : userInputsInfo.myPhone,
              }));
              setUserUnchangableInfo((prev) => ({
                ...prev,
                unchangableId: res.data?.profile_data?.data?.id,
                unchangableName: res.data?.profile_data?.data?.name || "",
                unchangableUserName:
                  res.data?.profile_data?.data?.username || "",
                unchangableEmail:
                  verifyEmail[0]?.data?.value ||
                  res.data?.profile_data?.data?.email ||
                  "",
                unchangablePhone:
                  verifyPhone[0]?.data?.value ||
                  res.data?.profile_data?.data?.phone ||
                  "",
              }));
              const data = res.data?.profile_page_custom_messages.filter(
                (item: any) =>
                  item.data.message ===
                    "username.USER_NAME_HAS_BEEN_REGISTERED_IN_OTHER_ACCOUNT" ||
                  item.data.message ===
                    "email_verify.EMAIL_HAS_BEEN_REGISTERED_IN_OTHER_ACCOUNT" ||
                  item.data.message ===
                    "phone_verify.PHONE_HAS_BEEN_REGISTERED_IN_OTHER_ACCOUNT"
              );

              // console.log({ data });

              for (let i = 0; i < data.length; i++) {
                const element = data[i].data;
                if (element.field === "username") {
                  setErrorStates((prev) => ({
                    ...prev,
                    userNameError: true,
                    userNameErrorCaption:
                      "نام کاربری قبلا توسط کاربر دیگری انتخاب شده است, مجددا تلاش کنید",
                  }));
                } else if (element.field === "email") {
                  setErrorStates((prev) => ({
                    ...prev,
                    emailError: true,
                    emailErrorCaption:
                      " این ایمیل قبلا توسط شخص دیگری ثبت شده است, مجددا تلاش کنید",
                  }));
                } else if (element.field === "phone") {
                  setErrorStates((prev) => ({
                    ...prev,
                    phoneError: true,
                    phoneErrorCaption:
                      "این شماره قبلا توسط شخص دیگری ثبت شده است, مجددا تلاش کنید",
                  }));
                }
              }
            })
            .catch((err) => {
              // console.log(err);
              setUserInputsInfo((prev) => ({ ...prev, profileLoading: false }));
            });
        }
      }

      var file = new File([userImage], getImageDirectly?.name, {
        ...getImageDirectly,
        type: getImageDirectly?.type,
      });
      const formData = new FormData();
      formData.append("profile_pic", file);
      formData.append("Authorization", localStorage.getItem("token"));
      formData.append("api-key", "testapikey");
      formData.append("app-version", "37");
      formData.append("app-market", "main");
      formData.append("app-name", "zabanamooz");
      formData.append("app-platform", "pwa");
      if (stableRecievedImage === userImage) {
        // console.log("don't do any thing about the pic");
      } else if (stableRecievedImage === null && userImage !== null) {
        // console.log("upload pic", "ok");
        setUserInputsInfo((prev) => ({
          ...prev,
          profileLoading: true,
        }));
        profileUploadAvatar(formData)
          .then((res) => {
            dispatch(updateSendUserProfileDataToServer(false));
            setOpenSuccessSnackbar(true);
            setUserInputsInfo((prev) => ({
              ...prev,
              profileLoading: false,
            }));
            // we use setStableRecievedImage(userImage) to prevent user from clicking save button
            // sequentially
            setStableRecievedImage(userImage);
            // console.log(res.data?.profile_data?.data?.profile_pic);
          })
          .catch((res) => {
            dispatch(updateSendUserProfileDataToServer(false));
            setUserInputsInfo((prev) => ({
              ...prev,
              profileLoading: false,
            }));
            // console.log(res);
          });
      } else if (stableRecievedImage !== null && userImage === null) {
        // console.log("delete pic");
        setUserInputsInfo((prev) => ({
          ...prev,
          profileLoading: true,
        }));
        profileDeleteAvatar()
          .then((res) => {
            setUserInputsInfo((prev) => ({
              ...prev,
              profileLoading: false,
            }));
            // console.log(res.data);
            // we use setStableRecievedImage(userImage) to prevent user from clicking save button
            // sequentially
            setStableRecievedImage(res.data?.profile_data?.data?.profile_pic);
          })
          .catch((err) => {
            // console.log(err);
            setUserInputsInfo((prev) => ({
              ...prev,
              profileLoading: false,
            }));
          });
      } else if (
        stableRecievedImage !== null &&
        userImage !== null &&
        stableRecievedImage !== userImage
      ) {
        setUserInputsInfo((prev) => ({
          ...prev,
          profileLoading: true,
        }));
        // console.log("remove previous pic and upload the new one");
        profileUploadAvatar(formData)
          .then((res) => {
            dispatch(updateSendUserProfileDataToServer(false));
            setOpenSuccessSnackbar(true);
            setUserInputsInfo((prev) => ({
              ...prev,
              profileLoading: false,
            }));
            // console.log(res.data?.profile_data?.data?.profile_pic);
            // we use setStableRecievedImage(userImage) to prevent user from clicking save button
            // sequentially
            setStableRecievedImage(userImage);
          })
          .catch((res) => {
            dispatch(updateSendUserProfileDataToServer(false));
            setUserInputsInfo((prev) => ({
              ...prev,
              profileLoading: false,
            }));
            // console.log(res);
          });
      }
    }
  }, [sendUserProfileDataToServer]);
  //////////////////
  /////////////////
  ////////////////

  // console.log({ stableRecievedImage }, { userImage });

  function handleChangeMyname(e: any) {
    const { value } = e.target;
    if (userUnchangableInfo.unchangableName === value) {
      // console.log("ذخیره کار نکنه");
    } else {
      // console.log("ذخیره باید کار کنه");
    }
    dispatch(updateSendUserProfileDataToServer(false));
    setErrorStates((prev) => ({
      ...prev,
      nameError: false,
      nameErrorCaption: "",
    }));
    setUserInputsInfo((prev) => ({ ...prev, myName: value }));
  }
  function handleChangeMyUserName(e: any) {
    const { value } = e.target;
    if (userUnchangableInfo.unchangableUserName === value) {
      // console.log("ذخیره کار نکنه");
    } else {
      // console.log("ذخیره باید کار کنه");
    }
    dispatch(updateSendUserProfileDataToServer(false));
    setErrorStates((prev) => ({
      ...prev,
      userNameError: false,
      userNameErrorCaption: "",
    }));
    setUserInputsInfo((prev) => ({ ...prev, myUserName: value }));
  }
  function handleChangeMyEmail(e: any) {
    const { value } = e.target;
    if (userUnchangableInfo.unchangableEmail === value) {
      // console.log("ذخیره کار نکنه");
    } else {
      // console.log("ذخیره باید کار کنه");
    }
    const savePhone = userInputsInfo.pendingVerification.filter(
      (item: any) => item?.data?.type !== "email"
    );
    dispatch(updateSendUserProfileDataToServer(false));
    setErrorStates((prev) => ({
      ...prev,
      emailError: false,
      emailErrorCaption: "",
    }));
    setUserInputsInfo((prev) => ({
      ...prev,
      myEmail: value,
      pendingVerification: savePhone,
    }));
  }
  function handleChangeMyPhone(e: any) {
    const { value } = e.target;
    if (userUnchangableInfo.unchangablePhone === value) {
      // console.log("ذخیره کار نکنه");
    } else {
      // console.log("ذخیره باید کار کنه");
    }
    const saveEmail = userInputsInfo.pendingVerification.filter(
      (item: any) => item?.data?.type !== "phone"
    );
    dispatch(updateSendUserProfileDataToServer(false));

    setErrorStates((prev) => ({
      ...prev,
      phoneError: false,
      phoneErrorCaption: "",
    }));
    setUserInputsInfo((prev) => ({
      ...prev,
      myPhone: value,
      pendingVerification: saveEmail,
    }));
  }

  function handleEmailConfirmation() {
    setUserInputsInfo((prev) => ({ ...prev, profileLoading: true }));
    getMyProfileDataApi({
      profile_data: {
        checksum: 1710063712446,
      },
      updated_data: {
        email: userInputsInfo.myEmail,
      },
    })
      .then((res) => {
        const verifyEmail = res.data?.pending_verification?.filter(
          (item: any) => item?.data?.type === "email"
        );
        setUserInputsInfo((prev) => ({
          ...prev,
          myEmail: verifyEmail[0]?.data?.value,
          profileLoading: false,
        }));
      })
      .catch((err) => {
        // console.log(err);
        setUserInputsInfo((prev) => ({ ...prev, profileLoading: false }));
      });
  }

  function handlePhoneConfirmation() {
    setUserInputsInfo((prev) => ({ ...prev, profileLoading: true }));
    getMyProfileDataApi({
      profile_data: {
        checksum: 1710063712446,
      },
      updated_data: {
        phone: userInputsInfo.myPhone,
      },
    })
      .then((res) => {
        const verifyPhone = res.data?.pending_verification?.filter(
          (item: any) => item?.data?.type === "phone"
        );
        setUserInputsInfo((prev) => ({
          ...prev,
          myPhone: verifyPhone[0]?.data?.value,
          profileLoading: false,
        }));
      })
      .catch((err) => {
        // console.log(err);
        setUserInputsInfo((prev) => ({ ...prev, profileLoading: false }));
      });
  }

  function handleCloseSnackbar() {
    setOpenSuccessSnackbar(false);
  }

  return (
    <Box className="profile-page-wrapper">
      <LottieLoading
        open_lottie={userInputsInfo.profileLoading}
        lottie_className="my-profile-loading"
      />
      <UserProfileAvater
        avatarPic={userImage}
        handleOpenFullProfilePicModal={handleOpenFullProfilePicModal}
        openInput={openInput}
        handleSelectImage={handleSelectImage}
        imageInputRef={imageInputRef}
      />

      <ShowUserProfilePic
        openFullProfilePic={openFullProfilePic}
        handleCloseFullProfilePicModal={handleCloseFullProfilePicModal}
        specificUserProfileInfo={userInputsInfo}
        showFullWidthImage={userImage}
        handleOpenSelectPic={handleOpenSelectPic}
      />

      <SelectOrDeletePicModal
        openSelectPicInDarkModal={openSelectPicInDarkModal}
        handleDelPicInDarkModal={handleDelPicInDarkModal}
        handleSelectImage={handleSelectImage}
        selectImageViaModalRef={selectImageViaModal}
        selectPic={selectPic}
        handleCloseSelectPic={handleCloseSelectPic}
      />

      <CropProfileImage
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        croppedImage={initialSelectedPic}
        crop={crop}
        zoom={zoom}
        setCrop={setCrop}
        onCropComplete={onCropComplete}
        setZoom={setZoom}
        handleShowCroppedImage={showCroppedImage}
        handleCloseCropImageModal={handleCloseModal}
        rotationState={rotationState}
        setRotationState={setRotationState}
      />

      <ProfileInputs
        title="نام"
        onChangeInput={handleChangeMyname}
        placeholderCaption="نام شما"
        inputValue={userInputsInfo.myName}
        isThereError={errorStates.nameError}
        errorCaption={errorStates.nameErrorCaption}
      />
      <ProfileInputs
        title="نام کاربری"
        onChangeInput={handleChangeMyUserName}
        placeholderCaption="User_name"
        inputValue={userInputsInfo.myUserName}
        isThereError={errorStates.userNameError}
        errorCaption={errorStates.userNameErrorCaption}
      />
      <ProfileInputs
        title="ایمیل"
        onChangeInput={handleChangeMyEmail}
        placeholderCaption="YourEmail@example.com"
        inputValue={userInputsInfo.myEmail}
        isThereError={errorStates.emailError}
        errorCaption={errorStates.emailErrorCaption}
        pendingVerification={userInputsInfo.pendingVerification}
        componentType="email"
        handleConfirmation={handleEmailConfirmation}
      />
      <ProfileInputs
        title="شماره موبایل"
        onChangeInput={handleChangeMyPhone}
        placeholderCaption="09391234567"
        inputValue={userInputsInfo.myPhone}
        isThereError={errorStates.phoneError}
        errorCaption={errorStates.phoneErrorCaption}
        pendingVerification={userInputsInfo.pendingVerification}
        componentType="phone"
        handleConfirmation={handlePhoneConfirmation}
      />
      <CommonSuccessSnackBar
        openSuccessSnackbar={openSuccessSnackbar}
        closeSnackBar={handleCloseSnackbar}
        type="success-profile-pic"
      />
    </Box>
  );
}

export default MyProfilePage;
