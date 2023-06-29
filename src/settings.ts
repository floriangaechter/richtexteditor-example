import {
    DropdownSize,
    IconEnum,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'content_block',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'content_block',
                    icon: IconEnum.BuildingBlock,
                    label: 'Content Block',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'myTitle',
            label: 'Title',
            type: 'textarea',
        },
        {
            id: 'myImage',
            label: 'An image',
            type: 'assetInput',
        },
        {
            id: 'myLinkchooser',
            label: 'Linkchooser',
            type: 'linkChooser',
        },
        {
            id: 'columns',
            type: 'segmentedControls',
            label: 'Columns',
            defaultValue: 1,
            choices: [
                {
                    value: 1,
                    label: '1',
                },
                {
                    value: 2,
                    label: '2',
                },
                {
                    value: 3,
                    label: '3',
                },
                {
                    value: 4,
                    label: '4',
                },
            ],
        },
        {
            id: 'hasCustomGutter',
            type: 'switch',
            defaultValue: false,
            switchLabel: 'Custom',
            label: 'Gutter',
            info: 'An official nerds term for ‘gap’',
            show: (bundle) => bundle.getBlock('columns')?.value !== '1',
            on: [
                {
                    id: 'customGutter',
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, 'customGutter'),
                },
            ],
            off: [
                {
                    id: 'gutter',
                    type: 'slider',
                    defaultValue: 'Auto',
                    choices: [
                        {
                            value: 'Auto',
                            label: 'Auto',
                        },
                        {
                            value: 'S',
                            label: 'S',
                        },
                        {
                            value: 'M',
                            label: 'M',
                        },
                        {
                            value: 'L',
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
});
