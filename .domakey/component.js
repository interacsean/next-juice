const { toUpperCaseFirst, camelToSnakeCaps } = require("domakey");

const pageComponentFile = `import React from 'react';
import { Box } from '@chakra-ui/react';

type {{CompName}}PublicProps = {};

const {{CompName}}: React.FC<{{CompName}}PublicProps> = (
  _props: {{CompName}}PublicProps,
) => {
  return (
    <Box>
    </Box>
  );
};

export default {{CompName}};
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const compNameName =
    cliArgs[0] || (await makey.ask("Component path (from web/components):"));
  const nestFolder = !cliFlags["nest=false"];

  const pathBitsAll = compNameName.split("/");
  const pageName = pathBitsAll[pathBitsAll.length - 1];
  const pathBits = pathBitsAll.slice(0, -1).join("/");
  const pathBitsWTrailingSlash = `${pathBits ? `${pathBits}/` : ""}`;
  const CompName = toUpperCaseFirst(pageName);

  const nestFolderStr = nestFolder ? `${CompName}/` : "";

  makey.createFile(
    `./web/components/${pathBitsWTrailingSlash}${nestFolderStr}${CompName}.tsx`,
    makey.templateReplace(pageComponentFile, { CompName }),
  );
};
