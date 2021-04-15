import React, {useState} from 'react';
import {Button, ButtonGroup, Center, HTMLChakraProps} from "@chakra-ui/react";

export interface UserIconProps extends HTMLChakraProps<"div"> {
    size: number;
}

const UserIcon = (props: UserIconProps) => {
    let [login, setLogin] = useState(true);

    return (
        <Center>
            {login ?

                <Center {...props} _hover={{transform: "scale(1.2)", cursor: "pointer"}}
                        borderRadius={props.size / 4} overflow="hidden"
                        transition="transform 0.3s 0s linear">
                    <img src={createAvatar(props.size, "KR")}/>
                </Center>

                :
                <ButtonGroup variant={"primary"} size={"sm"} marginLeft={2} marginRight={2}>
                    <Button>
                        Sign up
                    </Button>
                    <Button variant={"primarySolid"}>
                        Sign in
                    </Button>
                </ButtonGroup>
            }
        </Center>
    );
}

const createAvatar = (size: number, username: string): string => {
    let canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.width = size;
    canvas.height = size;
    let char = username.charCodeAt(0);
    let seed = (char * 300) % 128;
    seed = seed > 128 ? seed % 128 : seed;
    let color = `rgb(80, 128, ${seed * 2})`;
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#fff";
    ctx.font = 0.7 * size + "px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(username.charAt(0), size / 2, size / 2);

    return canvas.toDataURL();
}

export default UserIcon;
