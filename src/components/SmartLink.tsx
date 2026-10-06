import KontentSmartLink from "@kontent-ai/smart-link";
import type { FC, PropsWithChildren } from "react";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext.tsx";

let subscribers = 0;
let instance: KontentSmartLink | null = null;
let destroyTimer: number | undefined;

const SmartLink: FC<PropsWithChildren> = ({ children }) => {
  const { environmentId } = useAppContext();

  useEffect(() => {
    subscribers += 1;
    window.clearTimeout(destroyTimer);
    instance ??= KontentSmartLink.initialize({
      defaultDataAttributes: {
        environmentId,
        languageCodename: "default",
      },
    });

    return () => {
      subscribers -= 1;
      destroyTimer = window.setTimeout(() => {
        if (subscribers === 0 && instance) {
          instance.destroy();
          instance = null;
        }
      }, 0);
    };
  }, [environmentId]);

  return children;
};

export default SmartLink;
