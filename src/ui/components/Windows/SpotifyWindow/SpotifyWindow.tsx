import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeSpotifyWindow } from "../../../../redux/actions";
import {
  getSpotifyAccessToken,
  getSpotifyWindowOpen,
} from "../../../../redux/selectors";
import { APP_NAMES } from "../../../../types/shortcuts";
import { exhaustive } from "../../../../utils/typeUtils";
import CD_AUDIO_CD_ICO from "../../../assets/windows98-icons/cd_audio_cd.ico";
import MSG_INFORMATION_ICO from "../../../assets/windows98-icons/msg_information.ico";
import WM_FILE_ICO from "../../../assets/windows98-icons/wm_file.ico";
import { Divider } from "../../Divider";
import { Section } from "../../Section";
import { StupidHeader } from "../../StupidHeader";
import { Window } from "../../Window";
import { WindowButton } from "../../WindowButton";
import { Info } from "./Info";
import { Playlists } from "./Playlists";
import { Songs } from "./Songs";
import styles from "./SpotifyWindow.module.scss";

type SpotifyTab = "INFO" | "PLAYLISTS" | "SONGS";

export function SpotifyWindow() {
  const dispatch = useDispatch();

  const spotifyWindowOpen = useSelector(getSpotifyWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  const [selectedTab, setSelectedTab] = useState<SpotifyTab>("INFO");

  return spotifyWindowOpen ? (
    <Window
      onClose={() => dispatch(closeSpotifyWindow())}
      title={APP_NAMES.spotify}
      resizable
      hidden={hidden}
      appId="spotify"
    >
      <div className={styles.spotifyWindow}>
        <StupidHeader />
        <Divider />
        <div className={styles.body}>
          <IconShelf
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <TabsContainer selectedTab={selectedTab} />
        </div>
      </div>
    </Window>
  ) : null;
}

function IconShelf({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: SpotifyTab;
  setSelectedTab: (tab: SpotifyTab) => void;
}) {
  const spotifyAccessToken = useSelector(getSpotifyAccessToken);

  return (
    <div className={styles.iconShelf}>
      <div className={styles.buttons}>
        <WindowButton
          onClick={() => setSelectedTab("INFO")}
          imgType="ico"
          size="medium"
          selected={selectedTab === "INFO"}
        >
          <img src={MSG_INFORMATION_ICO} />
        </WindowButton>
        <WindowButton
          onClick={() => setSelectedTab("PLAYLISTS")}
          imgType="ico"
          size="medium"
          selected={selectedTab === "PLAYLISTS"}
          disabled={spotifyAccessToken === null}
        >
          <img src={WM_FILE_ICO} />
        </WindowButton>
        <WindowButton
          onClick={() => setSelectedTab("SONGS")}
          imgType="ico"
          size="medium"
          selected={selectedTab === "SONGS"}
          disabled={spotifyAccessToken === null}
        >
          <img src={CD_AUDIO_CD_ICO} />
        </WindowButton>
      </div>
      <div className={styles.placeholder} />
    </div>
  );
}

function TabsContainer({ selectedTab }: { selectedTab: SpotifyTab }) {
  return (
    <Section className={styles.section}>
      <Tabs selectedTab={selectedTab} />
    </Section>
  );
}

function Tabs({ selectedTab }: { selectedTab: SpotifyTab }) {
  switch (selectedTab) {
    case "INFO":
      return <Info />;
    case "PLAYLISTS":
      return <Playlists />;
    case "SONGS":
      return <Songs />;
    default:
      exhaustive("spotify tab", selectedTab);
  }

  return null;
}
