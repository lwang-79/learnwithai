import { 
  Avatar, 
  Box, 
  HStack, 
  Icon,
  Spacer, 
  Stack, 
  Text, 
  useBoolean, 
  useToast, 
  Wrap 
} from "@chakra-ui/react"
import { Auth } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { MdCenterFocusWeak, MdOutlineAddAPhoto, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { User } from "@/models";

interface AvatarFormProps {
  user: User,
  avatar: string,
  setAvatar: React.Dispatch<React.SetStateAction<string>>,
}

function AvatarForm({ user, avatar, setAvatar }: AvatarFormProps) {
  const [ socialAvatar, setSocialAvatar ] = useState('');
  const webcamRef = useRef<Webcam>(null);

  const [ isCameraOn, setIsCameraOn ] = useBoolean(false);

  const toast = useToast();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then( currentUser => {
      if (currentUser.attributes.picture)
        setSocialAvatar(currentUser.attributes.picture);
    })
  }, [user]);

  const cameraButtonClicked = () => {
    if (user.membership!.current < 2) {
      toast({
        description: `The feature is not available for your current plan, please upgrade your plan in profile.`,
        status: 'warning',
        duration: 5000,
        isClosable: true
      });

      return;
    }

    if (isCameraOn) {
      const videoWidth = webcamRef?.current?.video?.videoWidth as number;
      const videoHeight = webcamRef?.current?.video?.videoHeight as number;
      const src = webcamRef?.current?.getScreenshot({width:150, height:150 * videoHeight / videoWidth}) as string;
      setAvatar(src);
    }

    setIsCameraOn.toggle();
  }

  const uploadImageClicked = () => {
    if (user.membership!.current < 2) {
      toast({
        description: `The feature is not available for your current plan, please upgrade your plan in profile.`,
        status: 'warning',
        duration: 5000,
        isClosable: true
      });

      return;
    }

    setIsCameraOn.off();

    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.jpeg,.jpg,.png';

      const canvas = document.createElement('canvas');
  
      input.addEventListener("change", async () => {
        if (input.files){
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
              const ctx = canvas.getContext('2d');

              const maxWidth = 150;
              const maxHeight = 150;
              let width = img.width;
              let height = img.height;
              if (width > height) {
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
              } else {
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight
                }
              }

              canvas.width = width;
              canvas.height = height;

              ctx?.drawImage(img, 0, 0, width, height);

              const dataURL = canvas.toDataURL('image/png');
              setAvatar(dataURL);
            }
            const result = e.target?.result as string;
            img.src = result;
          }

          reader.readAsDataURL(input.files[0]);
        }
      }, false)  
  
      input.click();
  
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Stack align='center' spacing={4} mt={4}>
      {isCameraOn ? (
        <Box 
          w='96px' 
          h='96px' 
          rounded='full' 
          overflow='hidden' 
          position='relative'
          borderWidth='2px'
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            style={{
              width:'100%',
              height:'100%',
              objectFit: "cover",
            }}
          />
        </Box>
      ) : (
        <Avatar 
          src={avatar}
          name={user.username}
          size='xl'
          showBorder
          borderWidth='2px'
          borderColor='gray.200'
        />
      )}
      
      <Text as='b' fontSize='lg'>Please select an avatar</Text>
      <HStack justify='center'>
        <Spacer />
        <Wrap spacing={4}>
          <Avatar 
            src={socialAvatar} 
            name={user.username}
            size='lg'
            showBorder
            borderWidth='2px'
            borderColor='gray.200'
            cursor='pointer'
            _hover={{borderColor: 'gray.400'}}
            onClick={() => {
              setAvatar(socialAvatar);
            }}
          />

          {Array.from(Array(21).keys()).map(index => (
            <Avatar 
              key={`/avatars/${index}.png`}
              src={`/avatars/${index}.png`} 
              name={user.username}
              size='lg'
              showBorder
              borderWidth='2px'
              borderColor='gray.200'
              cursor='pointer'
              _hover={{borderColor: 'gray.400'}}
              onClick={() => {
                setIsCameraOn.off();
                setAvatar(`/avatars/${index}.png`);
              }}
            />
          ))}

          <Avatar 
            icon={<Icon as={MdOutlineAddPhotoAlternate} fontSize='2.5rem'/>}
            size='lg'
            showBorder
            borderWidth='2px'
            borderColor='gray.200'
            cursor='pointer'
            _hover={{borderColor: 'gray.400'}}
            onClick={uploadImageClicked}
          />

          <Avatar 
            icon={
              isCameraOn ? 
              <Icon as={MdCenterFocusWeak} color='red' fontSize='2.5rem'/> :
              <Icon as={MdOutlineAddAPhoto} fontSize='2.5rem'/>
            }
            size='lg'
            showBorder
            borderWidth='2px'
            borderColor='gray.200'
            cursor='pointer'
            _hover={{borderColor: 'gray.400'}}
            onClick={cameraButtonClicked}
          />

        </Wrap>
        <Spacer />
      </HStack>
    </Stack>
  )
}

export default AvatarForm
