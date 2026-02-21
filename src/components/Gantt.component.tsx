import {
  BarElement,
  CategoryScale,
  Chart,
  type ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { type CSSProperties, type JSX, useEffect, useMemo, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { type GanttChartData } from "../models/gantt.model";

/**
 * @notice Adding options will overwrite parts of the default options. If this option is a object, like plugins for example. The entire object will be overwriten, removing the default plugin options.
 * To keep those options you have to copy them within your own options object.
 * @param props
 * @returns 
 */
export function GanttComponent(props: {
  data: GanttChartData;
  options?: ChartOptions<"bar">;
  style?: CSSProperties;
  onMouseOut?: React.MouseEventHandler<HTMLCanvasElement> | undefined
  onMouseLeave?: React.MouseEventHandler<HTMLCanvasElement> | undefined
}): JSX.Element {
  const DEFAULT_STYLE: CSSProperties = useMemo<CSSProperties>(
    () => ({
      width: "100%",
      height: "100%",
    }),
    []
  );

  /**
   * Default options.
   * @notice Keep in mind that if you add options to the component that are an object of themselves that the overwrite will remove other components of the object.
   * Plugins:{} for example. If you only want to edit the zoom, you still need to copy all other options in your component or they will be removed.
   * There is probably a way to fix this, but I haven't found it yet.
   */
  const DEFAULT_OPTIONS: ChartOptions<"bar"> = useMemo<ChartOptions<"bar">>(
    () => ({
      indexAxis: "y" as const,
      scale: {
        y: {
          stacked: true,
        },
        x: {
          position: "top",
        },
      },
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        zoom: {
          zoom: {
            drag: {
              enabled: true,
              modifierKey: "ctrl",
            },
            wheel: {
              enabled: true,
            },
            mode: "x",
          },
          pan: {
            enabled: true,
            mode: "x",
          },
        },
      },
    }),
    []
  );

  const [data, setData] = useState<GanttChartData>(props.data);

  const [options, setOptions] = useState<ChartOptions<"bar"> | undefined>({
    ...DEFAULT_OPTIONS,
    ...props.options,
  });

  const [style, setStyle] = useState<CSSProperties>({
    ...DEFAULT_STYLE,
    ...props.style,
  });

  const chartRef = useRef<Chart<"bar">>(null);

  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  Chart.register(BarElement);
  Chart.register(Tooltip);
  Chart.unregister(Legend);

  import("chartjs-plugin-zoom").then((plugin) => {
    Chart.register(plugin.default);
  });

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    chartRef.current?.update('none');
  }, [props.data, props.options]);

  useEffect(() => {
    setOptions({ ...DEFAULT_OPTIONS, ...props.options });
  }, [DEFAULT_OPTIONS, props.options]);

  useEffect(() => {
    setStyle({ ...DEFAULT_STYLE, ...props.style });
  }, [props.style, DEFAULT_STYLE]);

  return <Bar onMouseLeave={props.onMouseLeave} onMouseOut={props.onMouseOut} data={data} options={options} ref={chartRef} style={style} />;
}
