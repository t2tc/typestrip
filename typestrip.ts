import { transform } from '@babel/standalone';

/**
 * Strips TypeScript types from the input code and returns pure JavaScript.
 * This function does not perform any type checking.
 * 
 * @param code - The TypeScript code to transform
 * @returns The transformed JavaScript code
 */
export function strip(code: string): string {
    const result = transform(code, {
        filename: 'virtual.ts', // 虚拟文件名，帮助 Babel 识别文件类型
        presets: ['typescript'],
        minified: false,
        compact: false,
    });

    if (!result || !result.code) {
        throw new Error('Failed to transform TypeScript code');
    }

    return result.code;
}