import React, { useState } from 'react'

import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function SginIn() {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');

    const [cookies, setCookies] = useCookies();

    const signinHandler = () => {
        if (userEmail.length === 0 || userPassword.length === 0) {
            alert("이메일과 비밀번호를 입력하세요.")
            return;
    }

    const data = {
        userEmail,
        userPassword,
    }

    axios
    .post("http://localhost:8080/api/auth/signIn", data)
    .then((response) => {
        const responseData = response.data;
        console.log(response.data);
        if (!responseData.result) {
            alert('로그인에 실패했습니다.');
            return;
        }
        const {token, exprTime, user } = responseData.data;
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds + exprTime);

        setCookies('token', token, {expires})
        alert(cookies.token);
    })
    .catch((error) => {
        alert('로그인에 실패했습니다.');
    })
}
  return (
    <Card sx={{ minWidth: 275, maxWidth: "50vw"}}>
        <CardContent>
            <Box>
                <TextField
                    fullWidth
                    label="이메일"
                    type="email"
                    variant="standard"
                    onChange={(e) => {setUserEmail(e.target.value)}}
                />
                 <TextField
                    fullWidth
                    label="비밀번호"
                    type="password"
                    variant="standard"
                    onChange={(e) => {setUserPassword(e.target.value)}}
                />
            </Box>
        </CardContent>
        <CardActions>
            <Button fullWidth onClick={() => signinHandler()} variant="contained">
                로그인
            </Button>
        </CardActions>
    </Card>
    )
}
