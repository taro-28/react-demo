import {
  EmojiEvents,
  Facebook,
  GitHub,
  MenuBook,
  Star,
  Twitter,
} from "@mui/icons-material";
import {
  AppBar,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hoge, setHoge] = useState<{ id: number; title: string }[]>([
    { id: 1, title: "初期値" },
  ]);

  useEffect(() => {
    fetch("/articles/")
      .then((res) => res.json())
      .then((json) => setHoge(json));
  }, []);

  const links: {
    name: string;
    icon: JSX.Element | null;
    url: string;
    userId: string;
  }[] = [
    {
      name: "GitHub",
      icon: <GitHub />,
      url: "github.com/taro-28",
      userId: "taro-28",
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      url: "twitter.com/taroro_tarotaro",
      userId: "taroro_tarotaro",
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      url: "www.facebook.com/taroro28/",
      userId: "taroro28",
    },
    {
      name: "Wantedly",
      icon: <Star />,
      url: "www.wantedly.com/id/taro_28",
      userId: "taro_28",
    },
    {
      name: "AtCoder",
      icon: <EmojiEvents />,
      url: "atcoder.jp/users/taroro_tarotaro",
      userId: "taroro_tarotaro",
    },
    {
      name: "ブクログ",
      icon: <MenuBook />,
      url: "booklog.jp/users/taro-28",
      userId: "taro-28",
    },
  ];
  return (
    <>
      <AppBar position="static">
        <Toolbar>Blog</Toolbar>
      </AppBar>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <h1>Taroro's Home</h1>
          <Typography paragraph={true}>
            I am a Web Developer Currently developing BtoB SaaS at a start-up
            company from 2020.11
            <br />
            Master of Science in Physics（Particle Physics,
            <br />
            Quantum Mechanics, Cosmology）
            <br />
            {hoge.map((fuga) => fuga.title)}
          </Typography>
          <h2>Experience</h2>
          <h2>Links</h2>
          <List>
            {links.map((link) => (
              <ListItem>
                <Tooltip title={link.name}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                </Tooltip>
                <Link
                  href={`https://${link.url}`}
                  underline="none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ListItemText primary={`@${link.userId}`} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
