import { useParams } from 'react-router-dom';
import { InfoPage } from '../../components/InfoPage';
import { infoPageDataMap } from '../../data/infoPageData';
import { Box, Heading, Center } from '@chakra-ui/react';

export const GenericInfoPage = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const pageData = pageId ? infoPageDataMap[pageId] : undefined;

  if (!pageData) {
    return (
      <Center h="50vh">
        <Box textAlign="center">
          <Heading>Página não encontrada</Heading>
        </Box>
      </Center>
    );
  }
  return (
    <InfoPage
      pageTitle={pageData.pageTitle}
      content={pageData.content}
    />
  );
};