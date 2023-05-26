import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, serializeRawToHtmlAsync } from '@frontify/fondue';
import type { BlockProps, SearchResult } from '@frontify/guideline-blocks-settings';

type Settings = {
    myTitle: string;
    myRichTextField: string;
    myLinkchooser: SearchResult;
};

export const AnExampleBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const onTextChange = (value: string) =>
        value !== blockSettings.myRichTextField && setBlockSettings({ myRichTextField: value });
    const [html, setHtml] = useState<string | null>(null);

    // this is how you can access the link from the linkchooser
    console.log(blockSettings.myLinkchooser.link);

    useEffect(() => {
        (async () => {
            setHtml(await serializeRawToHtmlAsync(blockSettings.myRichTextField));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blockSettings.myRichTextField]);

    return (
        <div>
            <h1>{blockSettings.myTitle}</h1>

            {isEditing ? (
                <RichTextEditor
                    onBlur={onTextChange}
                    onTextChange={onTextChange}
                    placeholder="Type your text here"
                    value={blockSettings.myRichTextField}
                />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: html || '<br />' }} />
            )}
            {blockAssets.myImage && <img src={blockAssets.myImage[0].previewUrl} alt="" />}
        </div>
    );
};
