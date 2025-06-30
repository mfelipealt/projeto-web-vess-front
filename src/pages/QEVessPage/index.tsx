import { Center, Icon, Tabs, Text } from "@chakra-ui/react"
import { LuCircle, LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import { InfoPage } from "../../components/InfoPage"
import { qe1VessData } from "../../data/qe1VessData"
import { qe2VessData } from "../../data/qe2VessData"
import { qe3VessData } from "../../data/qe4VessData"
import { qe4VessData } from "../../data/qe3VessData"
import { qe5VessData } from "../../data/qe5VessData"
import { useClearEvaluationsOnMount } from "../../hooks/useClearEvaluationsOnMount"

const tabsData = [
    {
        value: "qe1",
        icon: LuUser,
        shortTitle: "(Qe) 1",
        longTitle: "Qualidade estrutural (Qe) 1 Friável",
        contentData: qe1VessData
    },
    {
        value: "qe2",
        icon: LuFolder,
        shortTitle: "(Qe) 2",
        longTitle: "Qualidade estrutural (Qe) 2 Intacto",
        contentData: qe2VessData
    },
    {
        value: "qe3",
        icon: LuSquareCheck,
        shortTitle: "(Qe) 3",
        longTitle: "Qualidade estrutural (Qe) 3 Firme",
        contentData: qe3VessData
    },
    {
        value: "qe4",
        icon: LuSquareCheck,
        shortTitle: "(Qe) 4",
        longTitle: "Qualidade estrutural (Qe) 4 Compacto",
        contentData: qe4VessData
    },
    {
        value: "qe5",
        icon: LuCircle,
        shortTitle: "(Qe) 5",
        longTitle: "Qualidade estrutural (Qe) 5 Muito compacto",
        contentData: qe5VessData
    }
];

export const QEVessPage = () => {
    useClearEvaluationsOnMount();
    return (
        <Center p={4}>
            <Tabs.Root defaultValue="qe1" variant="plain" width="100%" maxW="container.xl">
                <Tabs.List bg="bg.muted" rounded="l3" p="1">
                    {tabsData.map((tab) => (
                        <Tabs.Trigger key={tab.value} value={tab.value} flex={{base: 1, md: "auto"}}>
                            <Icon as={tab.icon} mr={2} />
                            <Text as="span" display={{ base: 'inline', md: 'none' }}>
                                {tab.shortTitle}
                            </Text>
                            <Text as="span" display={{ base: 'none', md: 'inline' }}>
                                {tab.longTitle}
                            </Text>
                        </Tabs.Trigger>
                    ))}
                    <Tabs.Indicator rounded="l2" />
                </Tabs.List>
                {tabsData.map((tab) => (
                    <Tabs.Content key={tab.value} value={tab.value}>
                        <InfoPage
                            pageTitle={tab.longTitle}
                            content={tab.contentData}
                        />
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </Center>
    )
}
