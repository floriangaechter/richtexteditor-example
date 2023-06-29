import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, serializeRawToHtmlAsync } from '@frontify/fondue';
import type { BlockProps, SearchResult } from '@frontify/guideline-blocks-settings';

type Settings = {
    myTitle: string;
    myRichTextField: string;
    myLinkchooser: SearchResult;
    columns: number;
    gutter: string;
    hasCustomGutter: boolean;
    customGutter: string;
};

const columnsTailwindMap: Record<Settings['columns'], string> = {
    1: 'tw-columns-1',
    2: 'tw-columns-2',
    3: 'tw-columns-3',
    4: 'tw-columns-4',
};

const gutterTailwindMap: Record<Settings['gutter'], string> = {
    Auto: 'tw-gap-[4px]',
    S: 'tw-gap-[10px]',
    M: 'tw-gap-[30px]',
    L: 'tw-gap-[50px]',
};

export const AnExampleBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const onTextChange = (value: string) =>
        value !== blockSettings.myRichTextField && setBlockSettings({ myRichTextField: value });
    const [html, setHtml] = useState<string | null>(null);

    // this is how you can access the link from the linkchooser
    console.log(blockSettings);

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
                <div
                    className={`${columnsTailwindMap[blockSettings.columns]} ${
                        !blockSettings.hasCustomGutter ? gutterTailwindMap[blockSettings.gutter] : ''
                    }`}
                    style={blockSettings.hasCustomGutter ? { gap: blockSettings.customGutter } : undefined}
                >
                    <div dangerouslySetInnerHTML={{ __html: html || '<br />' }} />{' '}
                </div>
            )}
            {blockAssets.myImage && <img src={blockAssets.myImage[0].previewUrl} alt="" />}
        </div>
    );
};
