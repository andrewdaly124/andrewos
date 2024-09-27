import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BarChart, PieChart } from "@mui/x-charts";

import { closePepperWindow } from "../../../../redux/actions";
import { getPepperWindowOpen } from "../../../../redux/selectors";
import { APP_NAMES } from "../../../../types/shortcuts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import pepperPng from "../../../../ui/assets/pepper/peppy.png";
import { Window } from "../../Window";
import classes from "./PepperWindow.module.scss";

export function PepperWindow() {
  const dispatch = useDispatch();

  const pepperWindowOpen = useSelector(getPepperWindowOpen);

  // TODO (ada): Make
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);

  return pepperWindowOpen ? (
    <Window
      onClose={() => dispatch(closePepperWindow())}
      title={APP_NAMES["pepper-pics"]}
      resizable
      hidden={hidden}
      appId="pepper-pics"
    >
      <div className={classes.verticalLayout}>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: ["bar A", "bar B", "bar C"],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: [2, 5, 3],
            },
          ]}
          width={500}
          height={300}
        />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </Window>
  ) : null;
}
