import { ReactNode } from "react";

import { AppConfig } from "@/utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-50 antialiased">
    {props.meta}

    <div className="mx-auto">
      <div className="mx-auto max-w-screen-md border-b border-gray-300">
        <div className="pt-4 pb-8">
          <div className="text-3xl font-bold text-gray-50">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
      </div>

      <div className="content py-5 text-xl">{props.children}</div>

      <div className="mx-auto max-w-screen-md border-t border-gray-300 py-8 text-center text-sm">
        Powered with{" "}
        <span role="img" aria-label="Love">
          ♥
        </span>{" "}
        by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  </div>
);

export { Main };
