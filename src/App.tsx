import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
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
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import "./App.css";
import { createArticle } from "./graphql/mutations";
import { listArticles } from "./graphql/queries";
import logo from "./logo.svg";

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

const initialFormState = { name: "", description: "" };

function App() {
  const [articles, setArticles] = useState<
    {
      id?: number;
      name: string;
      description: string;
    }[]
  >([]);

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const apiData: any = await API.graphql({ query: listArticles });
    setArticles(apiData.data.listArticles.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createArticle,
      variables: { input: formData },
    });

    setArticles([...articles, formData]);
    setFormData(initialFormState);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>Blog</Toolbar>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have Auth!</h1>
        <AmplifySignOut />
      </AppBar>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <h1>Taroro's Home</h1>
          <input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Note name"
            value={formData.name}
          />
          <input
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Note description"
            value={formData.description}
          />
          <button onClick={createNote}>Create Note</button>
          {articles.map((article) => (
            <>
              <h2>{article.id || article.name}</h2>
              <p>{article.description}</p>
            </>
          ))}
          <Typography paragraph={true}>
            I am a Web Developer Currently developing BtoB SaaS at a start-up
            company from 2020.11
            <br />
            Master of Science in Physics（Particle Physics,
            <br />
            Quantum Mechanics, Cosmology）
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

export default withAuthenticator(App);
