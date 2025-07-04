import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { api } from "../../lib/axiios";


export type SpanItem = {
  text: string;
  bold?: boolean;
  underline?: boolean;
};

export type ContentItem = {
  type: 'heading' | 'paragraph' | 'image';
  // 'text' será usado para 'heading', 'spans' será usado para 'paragraph' devido a negrito e underlines
  text?: string;
  spans?: SpanItem[];
  src?: string;
  alt?: string;
  caption?: string;
};

type InfoPageProps = {
  pageTitle: string;
  content: ContentItem[];
};

export const InfoPage = ({ pageTitle, content }: InfoPageProps) => {
  // Função auxiliar para renderizar cada item do conteúdo
  const renderContentItem = (item: ContentItem, index: number) => {
    switch (item.type) {
      case 'heading':
        return (
          <Heading
            key={index}
            as="h2"
            size="md"
            mt={6}
            mb={3}
            textAlign="left"
            w="100%"
          >
            {item.text}
          </Heading>
        );
      case 'paragraph':
        return (
          <Text key={index} as="p" textAlign="left" w="100%">
            {item.spans?.map((span, spanIndex) => (
              <Text
                key={spanIndex}
                as="span" // Renderiza como <span> para ficar na mesma linha
                fontWeight={span.bold ? 'bold' : 'normal'}
                textDecoration={span.underline ? 'underline' : 'none'}
              >
                {span.text}
              </Text>
            ))}
          </Text>
        );

      case 'image':
        if (!item.src) return null;
        return (
          <Box as="figure" key={index} my={6} w="100%">
            <Image
              src={`${api.defaults.baseURL}/images/${item.src}`}
              alt={item.alt || 'Imagem informativa'}
              borderRadius="md"
              shadow="md"
            />
            {item.caption && (
              <Text as="figcaption" fontSize="sm" color="gray.600" mt={2} textAlign="center">
                {item.caption}
              </Text>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="800px" mx="auto">
      <VStack spaceX={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={6} color="teal.600">
          {pageTitle}
        </Heading>
        {content.map(renderContentItem)}
      </VStack>
    </Box>
  );
};