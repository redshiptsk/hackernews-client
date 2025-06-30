import { Divider, Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import type { INews } from "../../../types/types";

type NewsItemProps = {
    id: number;
    news: INews;
};

const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
};

export const NewsItem = observer(({ id, news }: NewsItemProps) => {
    return (
        <>
            <Link to={`${id}`}>
                <Flex vertical align="start">
                    <Typography.Title level={3}>
                        {news?.title || 'No title'}
                    </Typography.Title>
                    <Flex wrap="wrap" gap="small" align="center">
                        <Typography.Text>Rating: {news?.score || 0}</Typography.Text>
                        <Divider type="vertical" />
                        <Typography.Text>Author: {news?.by || 'Unknown'}</Typography.Text>
                        <Divider type="vertical" />
                        <Typography.Text>Published: {formatDate(news?.time)}</Typography.Text>
                        <Divider type="vertical" />
                        <Typography.Text>
                            Comments: {news?.kids?.length || 0}
                        </Typography.Text>
                    </Flex>
                </Flex>
            </Link>
            <Divider />
        </>
    );
});