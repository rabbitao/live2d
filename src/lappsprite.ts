/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/

import { gl, canvas } from './lappdelegate';

/**
 * スプライトを実装するクラス
 *
 * テクスチャＩＤ、Rectの管理
 */
export class LAppSprite {

     public _texture: WebGLTexture;   // テクスチャ
     public _vertexBuffer: WebGLBuffer;    // 頂点バッファ
     public _uvBuffer: WebGLBuffer;    // uv頂点バッファ
     public _indexBuffer: WebGLBuffer;    // 頂点インデックスバッファ
     public _rect: Rect;           // 矩形

     public _positionLocation: number;
     public _uvLocation: number;
     public _textureLocation: WebGLUniformLocation;

     public _positionArray: Float32Array;
     public _uvArray: Float32Array;
     public _indexArray: Uint16Array;

     public _firstDraw: boolean;
     /**
      * コンストラクタ
      * @param x            x座標
      * @param y            y座標
      * @param width        横幅
      * @param height       高さ
      * @param textureId    テクスチャ
      */
    constructor(x: number, y: number, width: number, height: number, textureId: WebGLTexture) {
        this._rect = new Rect();
        this._rect.left = (x - width * 0.5);
        this._rect.right = (x + width * 0.5);
        this._rect.up = (y + height * 0.5);
        this._rect.down = (y - height * 0.5);
        this._texture = textureId;
        this._vertexBuffer = null as any;
        this._uvBuffer = null as any;
        this._indexBuffer = null as any;

        this._positionLocation = null as any;
        this._uvLocation = null as any;
        this._textureLocation = null as any;

        this._positionArray = null as any;
        this._uvArray = null as any;
        this._indexArray = null as any;

        this._firstDraw = true;
    }

    /**
     * 解放する。
     */
    public release(): void {
      this._rect = null as any;

      gl.deleteTexture(this._texture);
      this._texture = null as any;

      gl.deleteBuffer(this._uvBuffer);
      this._uvBuffer = null as any;

      gl.deleteBuffer(this._vertexBuffer);
      this._vertexBuffer = null as any;

      gl.deleteBuffer(this._indexBuffer);
      this._indexBuffer = null as any;
    }

    /**
     * テクスチャを返す
     */
    public getTexture(): WebGLTexture {
        return this._texture;
    }

    /**
     * 描画する。
     * @param programId シェーダープログラム
     * @param canvas 描画するキャンパス情報
     */
    public render(programId: WebGLProgram): void {
        if (this._texture == null) {
            // ロードが完了していない
            return;
        }

        // 初回描画時
        if (this._firstDraw) {
            // 何番目のattribute変数か取得
            this._positionLocation = gl.getAttribLocation(programId, 'position');
            gl.enableVertexAttribArray(this._positionLocation);

            this._uvLocation = gl.getAttribLocation(programId, 'uv');
            gl.enableVertexAttribArray(this._uvLocation);

            // 何番目のuniform変数か取得
            this._textureLocation = gl.getUniformLocation(programId, 'texture') as any;

            // uniform属性の登録
            gl.uniform1i(this._textureLocation, 0);

            // uvバッファ、座標初期化
            {
                this._uvArray = new Float32Array([
                    1.0, 0.0,
                    0.0, 0.0,
                    0.0, 1.0,
                    1.0, 1.0,
                ]);

                // uvバッファを作成
                this._uvBuffer = gl.createBuffer() as any;
            }

            // 頂点バッファ、座標初期化
            {
                const maxWidth = canvas.width;
                const maxHeight = canvas.height;

                // 頂点データ
                this._positionArray = new Float32Array([
                    (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.up   - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.left  - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.up   - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.left  - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5), (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
                ]);

                // 頂点バッファを作成
                this._vertexBuffer = gl.createBuffer() as any;
            }

            // 頂点インデックスバッファ、初期化
            {
                // インデックスデータ
                this._indexArray = new Uint16Array([
                    0, 1, 2,
                    3, 2, 0,
                ]);

                // インデックスバッファを作成
                this._indexBuffer = gl.createBuffer() as any;
            }

            this._firstDraw = false;
        }

        // UV座標登録
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._uvArray, gl.STATIC_DRAW);

        // attribute属性を登録
        gl.vertexAttribPointer(this._uvLocation, 2, gl.FLOAT, false, 0, 0);

        // 頂点座標を登録
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._positionArray, gl.STATIC_DRAW);

        // attribute属性を登録
        gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);

        // 頂点インデックスを作成
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indexArray, gl.DYNAMIC_DRAW);

        // モデルの描画
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.drawElements(gl.TRIANGLES, this._indexArray.length, gl.UNSIGNED_SHORT, 0);
    }

    /**
     * 当たり判定
     * @param pointX x座標
     * @param pointY y座標
     */
    public isHit(pointX: number, pointY: number): boolean {
        // 画面サイズを取得する。
        let maxWidth, maxHeight;
        maxWidth = canvas.width;
        maxHeight = canvas.height;

        // Y座標は変換する必要あり
        const y = maxHeight - pointY;

        return (pointX >= this._rect.left && pointX <= this._rect.right && y <= this._rect.up && y >= this._rect.down);
    }
 }


export class Rect {
     public left: number = 0;   // 左辺
     public right: number = 0;  // 右辺
     public up: number = 0;     // 上辺
     public down: number = 0;   // 下辺
 }
