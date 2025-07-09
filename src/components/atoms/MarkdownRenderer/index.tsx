import React from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { MarkdownRendererProps } from './types';
import { styles, markdownStyles } from './styles';

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, style }) => {
    return (
        <View style={[styles.container, style]}>
            <Markdown style={markdownStyles}>
                {content}
            </Markdown>
        </View>
    );
};

export default MarkdownRenderer;
