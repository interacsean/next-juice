import React from "react";

const useWhatChanged = (deps: Record<string, any>) => {
  const [refs] = React.useState(deps);
  React.useEffect(() => {
    Object.keys(deps).map((depName) => {
      if (deps[depName] !== refs[depName])
        console.warn("What changed: ", depName);
    });
  }, Object.values(deps));
};

export default useWhatChanged;
