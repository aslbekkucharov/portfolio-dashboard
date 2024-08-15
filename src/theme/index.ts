import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
    token: {
        lineWidth: 2,
        borderRadius: 6,
        lineWidthFocus: 2,
        colorPrimary: '#252525'
    },

    components: {

        Button: {
            primaryShadow: '0 0px 0 rgba(0, 0, 0, 0)'
        },

        Input: {
            activeShadow: '0 0px 0 rgba(0, 0, 0, 0)'
        },

        Select: {
            fontSizeIcon: 16,
            controlOutlineWidth: 0,
            colorPrimaryActive: 'red'
        }
    }
} 