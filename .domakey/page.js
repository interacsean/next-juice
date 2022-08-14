const { toUpperCaseFirst, camelToSnakeCaps } = require("domakey");

const pageComponentFile = `import { NextPage } from 'next';
import React from 'react';
import { Text } from '@chakra-ui/react';
import Section from '../../layouts/Section/Section';

type {{PageName}}PublicProps = {};

const {{PageName}}: NextPage<{{PageName}}PublicProps> = (
  _props: {{PageName}}PublicProps,
) => {
  return (
    <Section>
      <Text>Hello world</Text>
    </Section>
  );
};

export default {{PageName}};
`;

const pagesShim = `import {{PageName}} from '../web/components/pages/{{PageName}}/{{PageName}}';

export default {{PageName}};
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const pagePathName = cliArgs[0] || (await makey.ask("Path to page:"));

  const pathBitsAll = pagePathName.split("/");
  const pageName = pathBitsAll[pathBitsAll.length - 1];
  const pathBits = pathBitsAll.slice(0, -1).join("/");
  const pathBitsWTrailingSlash = `${pathBits ? `${pathBits}/` : ""}`;
  const PageName = toUpperCaseFirst(pageName);

  const addNavMenuItem = await makey.askYN("Add nav menu item?", false);

  makey.createFile(
    `./web/components/pages/${pathBitsWTrailingSlash}${PageName}/${PageName}.tsx`,
    makey.templateReplace(pageComponentFile, { PageName }),
  );
  makey.createFile(
    `./pages/${pathBitsWTrailingSlash}${pageName}.tsx`,
    makey.templateReplace(pagesShim, { PageName }),
  );
  makey.editFile(`./consts/ROUTE_PATHS.ts`, (content) =>
    // todo: domakey add addLineAbove
    content.replace(
      "/* ! New Routes here ! */",
      `${camelToSnakeCaps(pageName)}: '/${pagePathName}',
  /* ! New Routes here ! */`,
    ),
  );
  if (addNavMenuItem) {
    makey.editFile(`./web/components/modules/Nav/Nav.tsx`, (content) =>
      // todo: domakey add addLineAbove
      content.replace(
        "{/* Add nav menu items here */}",
        `<NavLink href={ROUTE_PATHS.${camelToSnakeCaps(
          pageName,
        )}}>${PageName}</NavLink>
        {/* Add nav menu items here */}`,
      ),
    );
  }
};
