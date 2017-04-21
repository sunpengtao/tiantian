/**
 * Created by SPT on 2017/2/9.
 */
(function (r) {
    r.fn.qrcode = function (h) {
        var s;

        function u(a) {
            this.mode = s;
            this.data = a
        }

        function o(a, c) {
            this.typeNumber = a;
            this.errorCorrectLevel = c;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = []
        }

        function q(a, c) {
            if (void 0 == a.length)throw Error(a.length + "/" + c);
            for (var d = 0; d < a.length && 0 == a[d];)d++;
            this.num = Array(a.length - d + c);
            for (var b = 0; b < a.length - d; b++)this.num[b] = a[b + d]
        }

        function p(a, c) {
            this.totalCount = a;
            this.dataCount = c
        }

        function t() {
            this.buffer = [];
            this.length = 0
        }

        u.prototype = {
            getLength: function () {
                return this.data.length
            },
            write: function (a) {
                for (var c = 0; c < this.data.length; c++)a.put(this.data.charCodeAt(c), 8)
            }
        };
        o.prototype = {
            addData: function (a) {
                this.dataList.push(new u(a));
                this.dataCache = null
            }, isDark: function (a, c) {
                if (0 > a || this.moduleCount <= a || 0 > c || this.moduleCount <= c)throw Error(a + "," + c);
                return this.modules[a][c]
            }, getModuleCount: function () {
                return this.moduleCount
            }, make: function () {
                if (1 > this.typeNumber) {
                    for (var a = 1, a = 1; 40 > a; a++) {
                        for (var c = p.getRSBlocks(a, this.errorCorrectLevel), d = new t, b = 0, e = 0; e < c.length; e++)b += c[e].dataCount;
                        for (e = 0; e < this.dataList.length; e++)c = this.dataList[e], d.put(c.mode, 4), d.put(c.getLength(), j.getLengthInBits(c.mode, a)), c.write(d);
                        if (d.getLengthInBits() <= 8 * b)break
                    }
                    this.typeNumber = a
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            }, makeImpl: function (a, c) {
                this.moduleCount = 4 * this.typeNumber + 17;
                this.modules = Array(this.moduleCount);
                for (var d = 0; d < this.moduleCount; d++) {
                    this.modules[d] = Array(this.moduleCount);
                    for (var b = 0; b < this.moduleCount; b++)this.modules[d][b] = null
                }
                this.setupPositionProbePattern(0, 0);
                this.setupPositionProbePattern(this.moduleCount -
                    7, 0);
                this.setupPositionProbePattern(0, this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(a, c);
                7 <= this.typeNumber && this.setupTypeNumber(a);
                null == this.dataCache && (this.dataCache = o.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
                this.mapData(this.dataCache, c)
            }, setupPositionProbePattern: function (a, c) {
                for (var d = -1; 7 >= d; d++)if (!(-1 >= a + d || this.moduleCount <= a + d))for (var b = -1; 7 >= b; b++)-1 >= c + b || this.moduleCount <= c + b || (this.modules[a + d][c + b] =
                    0 <= d && 6 >= d && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == d || 6 == d) || 2 <= d && 4 >= d && 2 <= b && 4 >= b ? !0 : !1)
            }, getBestMaskPattern: function () {
                for (var a = 0, c = 0, d = 0; 8 > d; d++) {
                    this.makeImpl(!0, d);
                    var b = j.getLostPoint(this);
                    if (0 == d || a > b)a = b, c = d
                }
                return c
            }, createMovieClip: function (a, c, d) {
                a = a.createEmptyMovieClip(c, d);
                this.make();
                for (c = 0; c < this.modules.length; c++)for (var d = 1 * c, b = 0; b < this.modules[c].length; b++) {
                    var e = 1 * b;
                    this.modules[c][b] && (a.beginFill(0, 100), a.moveTo(e, d), a.lineTo(e + 1, d), a.lineTo(e + 1, d + 1), a.lineTo(e, d + 1), a.endFill())
                }
                return a
            },
            setupTimingPattern: function () {
                for (var a = 8; a < this.moduleCount - 8; a++)null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
                for (a = 8; a < this.moduleCount - 8; a++)null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
            }, setupPositionAdjustPattern: function () {
                for (var a = j.getPatternPosition(this.typeNumber), c = 0; c < a.length; c++)for (var d = 0; d < a.length; d++) {
                    var b = a[c], e = a[d];
                    if (null == this.modules[b][e])for (var f = -2; 2 >= f; f++)for (var i = -2; 2 >= i; i++)this.modules[b + f][e + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
                }
            }, setupTypeNumber: function (a) {
                for (var c =
                    j.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
                    var b = !a && 1 == (c >> d & 1);
                    this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b
                }
                for (d = 0; 18 > d; d++)b = !a && 1 == (c >> d & 1), this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b
            }, setupTypeInfo: function (a, c) {
                for (var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0; 15 > b; b++) {
                    var e = !a && 1 == (d >> b & 1);
                    6 > b ? this.modules[b][8] = e : 8 > b ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e
                }
                for (b = 0; 15 > b; b++)e = !a && 1 == (d >> b & 1), 8 > b ? this.modules[8][this.moduleCount -
                b - 1] = e : 9 > b ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e;
                this.modules[this.moduleCount - 8][8] = !a
            }, mapData: function (a, c) {
                for (var d = -1, b = this.moduleCount - 1, e = 7, f = 0, i = this.moduleCount - 1; 0 < i; i -= 2)for (6 == i && i--; ;) {
                    for (var g = 0; 2 > g; g++)if (null == this.modules[b][i - g]) {
                        var n = !1;
                        f < a.length && (n = 1 == (a[f] >>> e & 1));
                        j.getMask(c, b, i - g) && (n = !n);
                        this.modules[b][i - g] = n;
                        e--;
                        -1 == e && (f++, e = 7)
                    }
                    b += d;
                    if (0 > b || this.moduleCount <= b) {
                        b -= d;
                        d = -d;
                        break
                    }
                }
            }
        };
        o.PAD0 = 236;
        o.PAD1 = 17;
        o.createData = function (a, c, d) {
            for (var c = p.getRSBlocks(a,
                c), b = new t, e = 0; e < d.length; e++) {
                var f = d[e];
                b.put(f.mode, 4);
                b.put(f.getLength(), j.getLengthInBits(f.mode, a));
                f.write(b)
            }
            for (e = a = 0; e < c.length; e++)a += c[e].dataCount;
            if (b.getLengthInBits() > 8 * a)throw Error("code length overflow. (" + b.getLengthInBits() + ">" + 8 * a + ")");
            for (b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4); 0 != b.getLengthInBits() % 8;)b.putBit(!1);
            for (; !(b.getLengthInBits() >= 8 * a);) {
                b.put(o.PAD0, 8);
                if (b.getLengthInBits() >= 8 * a)break;
                b.put(o.PAD1, 8)
            }
            return o.createBytes(b, c)
        };
        o.createBytes = function (a, c) {
            for (var d =
                0, b = 0, e = 0, f = Array(c.length), i = Array(c.length), g = 0; g < c.length; g++) {
                var n = c[g].dataCount, h = c[g].totalCount - n, b = Math.max(b, n), e = Math.max(e, h);
                f[g] = Array(n);
                for (var k = 0; k < f[g].length; k++)f[g][k] = 255 & a.buffer[k + d];
                d += n;
                k = j.getErrorCorrectPolynomial(h);
                n = (new q(f[g], k.getLength() - 1)).mod(k);
                i[g] = Array(k.getLength() - 1);
                for (k = 0; k < i[g].length; k++)h = k + n.getLength() - i[g].length, i[g][k] = 0 <= h ? n.get(h) : 0
            }
            for (k = g = 0; k < c.length; k++)g += c[k].totalCount;
            d = Array(g);
            for (k = n = 0; k < b; k++)for (g = 0; g < c.length; g++)k < f[g].length &&
            (d[n++] = f[g][k]);
            for (k = 0; k < e; k++)for (g = 0; g < c.length; g++)k < i[g].length && (d[n++] = i[g][k]);
            return d
        };
        s = 4;
        for (var j = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52,
                78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (a) {
                for (var c = a << 10; 0 <= j.getBCHDigit(c) - j.getBCHDigit(j.G15);)c ^= j.G15 << j.getBCHDigit(c) - j.getBCHDigit(j.G15);
                return (a << 10 | c) ^ j.G15_MASK
            },
            getBCHTypeNumber: function (a) {
                for (var c = a << 12; 0 <= j.getBCHDigit(c) -
                j.getBCHDigit(j.G18);)c ^= j.G18 << j.getBCHDigit(c) - j.getBCHDigit(j.G18);
                return a << 12 | c
            },
            getBCHDigit: function (a) {
                for (var c = 0; 0 != a;)c++, a >>>= 1;
                return c
            },
            getPatternPosition: function (a) {
                return j.PATTERN_POSITION_TABLE[a - 1]
            },
            getMask: function (a, c, d) {
                switch (a) {
                    case 0:
                        return 0 == (c + d) % 2;
                    case 1:
                        return 0 == c % 2;
                    case 2:
                        return 0 == d % 3;
                    case 3:
                        return 0 == (c + d) % 3;
                    case 4:
                        return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
                    case 5:
                        return 0 == c * d % 2 + c * d % 3;
                    case 6:
                        return 0 == (c * d % 2 + c * d % 3) % 2;
                    case 7:
                        return 0 == (c * d % 3 + (c + d) % 2) % 2;
                    default:
                        throw Error("bad maskPattern:" +
                            a);
                }
            },
            getErrorCorrectPolynomial: function (a) {
                for (var c = new q([1], 0), d = 0; d < a; d++)c = c.multiply(new q([1, l.gexp(d)], 0));
                return c
            },
            getLengthInBits: function (a, c) {
                if (1 <= c && 10 > c)switch (a) {
                    case 1:
                        return 10;
                    case 2:
                        return 9;
                    case s:
                        return 8;
                    case 8:
                        return 8;
                    default:
                        throw Error("mode:" + a);
                } else if (27 > c)switch (a) {
                    case 1:
                        return 12;
                    case 2:
                        return 11;
                    case s:
                        return 16;
                    case 8:
                        return 10;
                    default:
                        throw Error("mode:" + a);
                } else if (41 > c)switch (a) {
                    case 1:
                        return 14;
                    case 2:
                        return 13;
                    case s:
                        return 16;
                    case 8:
                        return 12;
                    default:
                        throw Error("mode:" +
                            a);
                } else throw Error("type:" + c);
            },
            getLostPoint: function (a) {
                for (var c = a.getModuleCount(), d = 0, b = 0; b < c; b++)for (var e = 0; e < c; e++) {
                    for (var f = 0, i = a.isDark(b, e), g = -1; 1 >= g; g++)if (!(0 > b + g || c <= b + g))for (var h = -1; 1 >= h; h++)0 > e + h || c <= e + h || 0 == g && 0 == h || i == a.isDark(b + g, e + h) && f++;
                    5 < f && (d += 3 + f - 5)
                }
                for (b = 0; b < c - 1; b++)for (e = 0; e < c - 1; e++)if (f = 0, a.isDark(b, e) && f++, a.isDark(b + 1, e) && f++, a.isDark(b, e + 1) && f++, a.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f)d += 3;
                for (b = 0; b < c; b++)for (e = 0; e < c - 6; e++)a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b, e +
                    2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) && a.isDark(b, e + 6) && (d += 40);
                for (e = 0; e < c; e++)for (b = 0; b < c - 6; b++)a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b + 5, e) && a.isDark(b + 6, e) && (d += 40);
                for (e = f = 0; e < c; e++)for (b = 0; b < c; b++)a.isDark(b, e) && f++;
                a = Math.abs(100 * f / c / c - 50) / 5;
                return d + 10 * a
            }
        }, l = {
            glog: function (a) {
                if (1 > a)throw Error("glog(" + a + ")");
                return l.LOG_TABLE[a]
            }, gexp: function (a) {
                for (; 0 > a;)a += 255;
                for (; 256 <= a;)a -= 255;
                return l.EXP_TABLE[a]
            }, EXP_TABLE: Array(256),
            LOG_TABLE: Array(256)
        }, m = 0; 8 > m; m++)l.EXP_TABLE[m] = 1 << m;
        for (m = 8; 256 > m; m++)l.EXP_TABLE[m] = l.EXP_TABLE[m - 4] ^ l.EXP_TABLE[m - 5] ^ l.EXP_TABLE[m - 6] ^ l.EXP_TABLE[m - 8];
        for (m = 0; 255 > m; m++)l.LOG_TABLE[l.EXP_TABLE[m]] = m;
        q.prototype = {
            get: function (a) {
                return this.num[a]
            }, getLength: function () {
                return this.num.length
            }, multiply: function (a) {
                for (var c = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++)for (var b = 0; b < a.getLength(); b++)c[d + b] ^= l.gexp(l.glog(this.get(d)) + l.glog(a.get(b)));
                return new q(c, 0)
            }, mod: function (a) {
                if (0 >
                    this.getLength() - a.getLength())return this;
                for (var c = l.glog(this.get(0)) - l.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++)d[b] = this.get(b);
                for (b = 0; b < a.getLength(); b++)d[b] ^= l.gexp(l.glog(a.get(b)) + c);
                return (new q(d, 0)).mod(a)
            }
        };
        p.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27],
            [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146,
                116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15,
                43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45,
                3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19,
                55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10,
                45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
        p.getRSBlocks = function (a, c) {
            var d = p.getRsBlockTable(a, c);
            if (void 0 == d)throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + c);
            for (var b = d.length / 3, e = [], f = 0; f < b; f++)for (var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], l = 0; l < h; l++)e.push(new p(g, j));
            return e
        };
        p.getRsBlockTable = function (a, c) {
            switch (c) {
                case 1:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 0];
                case 0:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 1];
                case 3:
                    return p.RS_BLOCK_TABLE[4 *
                    (a - 1) + 2];
                case 2:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 3]
            }
        };
        t.prototype = {
            get: function (a) {
                return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
            }, put: function (a, c) {
                for (var d = 0; d < c; d++)this.putBit(1 == (a >>> c - d - 1 & 1))
            }, getLengthInBits: function () {
                return this.length
            }, putBit: function (a) {
                var c = Math.floor(this.length / 8);
                this.buffer.length <= c && this.buffer.push(0);
                a && (this.buffer[c] |= 128 >>> this.length % 8);
                this.length++
            }
        };
        "string" === typeof h && (h = {text: h});
        h = r.extend({}, {
            render: "canvas", width: 256, height: 256, typeNumber: -1,
            correctLevel: 2, background: "#ffffff", foreground: "#000000"
        }, h);
        return this.each(function () {
            var a;
            if ("canvas" == h.render) {
                a = new o(h.typeNumber, h.correctLevel);
                a.addData(h.text);
                a.make();
                var c = document.createElement("canvas");
                c.width = h.width;
                c.height = h.height;
                for (var d = c.getContext("2d"), b = h.width / a.getModuleCount(), e = h.height / a.getModuleCount(), f = 0; f < a.getModuleCount(); f++)for (var i = 0; i < a.getModuleCount(); i++) {
                    d.fillStyle = a.isDark(f, i) ? h.foreground : h.background;
                    var g = Math.ceil((i + 1) * b) - Math.floor(i * b),
                        j = Math.ceil((f + 1) * b) - Math.floor(f * b);
                    d.fillRect(Math.round(i * b), Math.round(f * e), g, j)
                }
            } else {
                a = new o(h.typeNumber, h.correctLevel);
                a.addData(h.text);
                a.make();
                c = r("<table></table>").css("width", h.width + "px").css("height", h.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", h.background);
                d = h.width / a.getModuleCount();
                b = h.height / a.getModuleCount();
                for (e = 0; e < a.getModuleCount(); e++) {
                    f = r("<tr></tr>").css("height", b + "px").appendTo(c);
                    for (i = 0; i < a.getModuleCount(); i++)r("<td></td>").css("width",
                        d + "px").css("background-color", a.isDark(e, i) ? h.foreground : h.background).appendTo(f)
                }
            }
            a = c;
            jQuery(a).appendTo(this)
        })
    }
})(jQuery);

!function (t) {
    function e(r) {
        if (n[r])return n[r].exports;
        var o = n[r] = {i: r, l: !1, exports: {}};
        return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
    }

    var n = {};
    return e.m = t, e.c = n, e.i = function (t) {
        return t
    }, e.d = function (t, e, n) {
        Object.defineProperty(t, e, {configurable: !1, enumerable: !0, get: n})
    }, e.n = function (t) {
        var n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 21)
}([function (t, e) {
    "use strict";
    function n(t, e) {
        var n, r = {};
        for (n in t)t.hasOwnProperty(n) && (r[n] = t[n]);
        for (n in e)e.hasOwnProperty(n) && "undefined" != typeof e[n] && (r[n] = e[n]);
        return r
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.default = n
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var s = n(10), u = r(s), f = function (t) {
        function e(n, r) {
            o(this, e);
            var a = i(this, t.call(this, n.substring(1), r));
            a.bytes = [];
            for (var s = 0; s < n.length; ++s)a.bytes.push(n.charCodeAt(s));
            return a.encodings = [740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, 668, 680, 692, 5379], a
        }

        return a(e, t), e.prototype.encode = function () {
            var t, e = this.bytes, n = e.shift() - 105;
            return 103 === n ? t = this.nextA(e, 1) : 104 === n ? t = this.nextB(e, 1) : 105 === n && (t = this.nextC(e, 1)), {
                text: this.text.replace(/[^\x20-\x7E]/g, ""),
                data: this.getEncoding(n) + t.result + this.getEncoding((t.checksum + n) % 103) + this.getEncoding(106)
            }
        }, e.prototype.getEncoding = function (t) {
            return this.encodings[t] ? (this.encodings[t] + 1e3).toString(2) : ""
        }, e.prototype.valid = function () {
            return this.data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1
        }, e.prototype.nextA = function (t, e) {
            if (t.length <= 0)return {result: "", checksum: 0};
            var n, r;
            if (t[0] >= 200)r = t[0] - 105, t.shift(), 99 === r ? n = this.nextC(t, e + 1) : 100 === r ? n = this.nextB(t, e + 1) : 98 === r ? (t[0] = t[0] > 95 ? t[0] - 96 : t[0], n = this.nextA(t, e + 1)) : n = this.nextA(t, e + 1); else {
                var o = t[0];
                r = o < 32 ? o + 64 : o - 32, t.shift(), n = this.nextA(t, e + 1)
            }
            var i = this.getEncoding(r), a = r * e;
            return {result: i + n.result, checksum: a + n.checksum}
        }, e.prototype.nextB = function (t, e) {
            if (t.length <= 0)return {result: "", checksum: 0};
            var n, r;
            t[0] >= 200 ? (r = t[0] - 105, t.shift(), 99 === r ? n = this.nextC(t, e + 1) : 101 === r ? n = this.nextA(t, e + 1) : 98 === r ? (t[0] = t[0] < 32 ? t[0] + 96 : t[0], n = this.nextB(t, e + 1)) : n = this.nextB(t, e + 1)) : (r = t[0] - 32, t.shift(), n = this.nextB(t, e + 1));
            var o = this.getEncoding(r), i = r * e;
            return {result: o + n.result, checksum: i + n.checksum}
        }, e.prototype.nextC = function (t, e) {
            if (t.length <= 0)return {result: "", checksum: 0};
            var n, r;
            t[0] >= 200 ? (r = t[0] - 105, t.shift(), n = 100 === r ? this.nextB(t, e + 1) : 101 === r ? this.nextA(t, e + 1) : this.nextC(t, e + 1)) : (r = 10 * (t[0] - 48) + t[1] - 48, t.shift(), t.shift(), n = this.nextC(t, e + 1));
            var o = this.getEncoding(r), i = r * e;
            return {result: o + n.result, checksum: i + n.checksum}
        }, e
    }(u.default);
    e.default = f
}, function (t, e) {
    "use strict";
    function n(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    function r(t, e) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var i = function (t) {
        function e(o, i) {
            n(this, e);
            var a = r(this, t.call(this));
            return a.name = "InvalidInputException", a.symbology = o, a.input = i, a.message = '"' + a.input + '" is not a valid input for ' + a.symbology, a
        }

        return o(e, t), e
    }(Error), a = function (t) {
        function e() {
            n(this, e);
            var o = r(this, t.call(this));
            return o.name = "InvalidElementException", o.message = "Not supported type to render on", o
        }

        return o(e, t), e
    }(Error), s = function (t) {
        function e() {
            n(this, e);
            var o = r(this, t.call(this));
            return o.name = "NoElementException", o.message = "No element to render on.", o
        }

        return o(e, t), e
    }(Error);
    e.InvalidInputException = i, e.InvalidElementException = a, e.NoElementException = s
}, function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var n = {
        width: 2,
        height: 100,
        format: "auto",
        displayValue: !0,
        fontOptions: "",
        font: "monospace",
        text: void 0,
        textAlign: "center",
        textPosition: "bottom",
        textMargin: 2,
        fontSize: 20,
        background: "#ffffff",
        lineColor: "#000000",
        margin: 10,
        marginTop: void 0,
        marginBottom: void 0,
        marginLeft: void 0,
        marginRight: void 0,
        valid: function () {
        }
    };
    e.default = n
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        return e.height + (e.displayValue && t.text.length > 0 ? e.fontSize + e.textMargin : 0) + e.marginTop + e.marginBottom
    }

    function i(t, e, n) {
        if (n.displayValue && e < t) {
            if ("center" == n.textAlign)return Math.floor((t - e) / 2);
            if ("left" == n.textAlign)return 0;
            if ("right" == n.textAlign)return Math.floor(t - e)
        }
        return 0
    }

    function a(t, e, n) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r], s = (0, l.default)(e, a.options), u = f(a.text, s, n), c = a.data.length * s.width;
            a.width = Math.ceil(Math.max(u, c)), a.height = o(a, s), a.barcodePadding = i(u, c, s)
        }
    }

    function s(t) {
        for (var e = 0, n = 0; n < t.length; n++)e += t[n].width;
        return e
    }

    function u(t) {
        for (var e = 0, n = 0; n < t.length; n++)t[n].height > e && (e = t[n].height);
        return e
    }

    function f(t, e, n) {
        var r;
        r = "undefined" == typeof n ? document.createElement("canvas").getContext("2d") : n, r.font = e.fontOptions + " " + e.fontSize + "px " + e.font;
        var o = r.measureText(t).width;
        return o
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.getTotalWidthOfEncodings = e.calculateEncodingAttributes = e.getBarcodePadding = e.getEncodingHeight = e.getMaximumHeightOfEncodings = void 0;
    var c = n(0), l = r(c);
    e.getMaximumHeightOfEncodings = u, e.getEncodingHeight = o, e.getBarcodePadding = i, e.calculateEncodingAttributes = a, e.getTotalWidthOfEncodings = s
}, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var r = n(15);
    e.default = {CODE128: r.CODE128, CODE128A: r.CODE128A, CODE128B: r.CODE128B, CODE128C: r.CODE128C}
}, function (t, e) {
    "use strict";
    function n(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var r = function () {
        function t(e) {
            n(this, t), this.api = e
        }

        return t.prototype.handleCatch = function (t) {
            if ("InvalidInputException" !== t.name)throw t;
            if (this.api._options.valid === this.api._defaults.valid)throw t.message;
            this.api._options.valid(!1), this.api.render = function () {
            }
        }, t.prototype.wrapBarcodeCall = function (t) {
            try {
                var e = t.apply(void 0, arguments);
                return this.api._options.valid(!0), e
            } catch (t) {
                return this.handleCatch(t), this.api
            }
        }, t
    }();
    e.default = r
}, function (t, e) {
    "use strict";
    function n(t) {
        return t.marginTop = t.marginTop || t.margin, t.marginBottom = t.marginBottom || t.margin, t.marginRight = t.marginRight || t.margin, t.marginLeft = t.marginLeft || t.margin, t
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.default = n
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t) {
        if ("string" == typeof t)return i(t);
        if (Array.isArray(t)) {
            for (var e = [], n = 0; n < t.length; n++)e.push(o(t[n]));
            return e
        }
        if ("undefined" != typeof HTMLCanvasElement && t instanceof HTMLImageElement)return a(t);
        if ("undefined" != typeof SVGElement && t instanceof SVGElement)return {
            element: t,
            options: (0, u.default)(t),
            renderer: (0, f.getRendererClass)("svg")
        };
        if ("undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement)return {
            element: t,
            options: (0, u.default)(t),
            renderer: (0, f.getRendererClass)("canvas")
        };
        if (t.getContext)return {element: t, renderer: (0, f.getRendererClass)("canvas")};
        throw new c.InvalidElementException
    }

    function i(t) {
        var e = document.querySelectorAll(t);
        if (0 !== e.length) {
            for (var n = [], r = 0; r < e.length; r++)n.push(o(e[r]));
            return n
        }
    }

    function a(t) {
        var e = document.createElement("canvas");
        return {
            element: e,
            options: (0, u.default)(t),
            renderer: (0, f.getRendererClass)("canvas"),
            afterRender: function () {
                t.setAttribute("src", e.toDataURL())
            }
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var s = n(16), u = r(s), f = n(19), c = n(2);
    e.default = o
}, function (t, e) {
    "use strict";
    function n(t) {
        function e(t) {
            if (Array.isArray(t))for (var r = 0; r < t.length; r++)e(t[r]); else t.text = t.text || "", t.data = t.data || "", n.push(t)
        }

        var n = [];
        return e(t), n
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.default = n
}, function (t, e) {
    "use strict";
    function n(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var r = function t(e, r) {
        n(this, t), this.data = e, this.text = r.text || e, this.options = r
    };
    e.default = r
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var s = n(1), u = r(s), f = function (t) {
        function e(n, r) {
            return o(this, e), i(this, t.call(this, String.fromCharCode(208) + n, r))
        }

        return a(e, t), e.prototype.valid = function () {
            return this.data.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1
        }, e
    }(u.default);
    e.default = f
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var s = n(1), u = r(s), f = function (t) {
        function e(n, r) {
            return o(this, e), i(this, t.call(this, String.fromCharCode(209) + n, r))
        }

        return a(e, t), e.prototype.valid = function () {
            return this.data.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1
        }, e
    }(u.default);
    e.default = f
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var s = n(1), u = r(s), f = function (t) {
        function e(n, r) {
            return o(this, e), i(this, t.call(this, String.fromCharCode(210) + n, r))
        }

        return a(e, t), e.prototype.valid = function () {
            return this.data.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1
        }, e
    }(u.default);
    e.default = f
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
        if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function s(t) {
        var e, n = t.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length, r = t.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length, o = t.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;
        return e = o >= 2 ? String.fromCharCode(210) + c(t) : n > r ? String.fromCharCode(208) + u(t) : String.fromCharCode(209) + f(t), e = e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function (t, e) {
            return String.fromCharCode(203) + e
        })
    }

    function u(t) {
        var e = t.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);
        if (e)return e[1] + String.fromCharCode(204) + c(t.substring(e[1].length));
        var n = t.match(/^[\x00-\x5F\xC8-\xCF]+/);
        return n[0].length === t.length ? t : n[0] + String.fromCharCode(205) + f(t.substring(n[0].length))
    }

    function f(t) {
        var e = t.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);
        if (e)return e[1] + String.fromCharCode(204) + c(t.substring(e[1].length));
        var n = t.match(/^[\x20-\x7F\xC8-\xCF]+/);
        return n[0].length === t.length ? t : n[0] + String.fromCharCode(206) + u(t.substring(n[0].length))
    }

    function c(t) {
        var e = t.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0], n = e.length;
        if (n === t.length)return t;
        t = t.substring(n);
        var r = t.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length, o = t.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
        return r >= o ? e + String.fromCharCode(206) + u(t) : e + String.fromCharCode(205) + f(t)
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var l = n(1), d = r(l), h = function (t) {
        function e(n, r) {
            if (o(this, e), n.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1)var a = i(this, t.call(this, s(n), r)); else var a = i(this, t.call(this, n, r));
            return i(a)
        }

        return a(e, t), e
    }(d.default);
    e.default = h
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.CODE128C = e.CODE128B = e.CODE128A = e.CODE128 = void 0;
    var o = n(14), i = r(o), a = n(11), s = r(a), u = n(12), f = r(u), c = n(13), l = r(c);
    e.CODE128 = i.default, e.CODE128A = s.default, e.CODE128B = f.default, e.CODE128C = l.default
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t) {
        var e = {};
        for (var n in u.default)u.default.hasOwnProperty(n) && (t.hasAttribute("jsbarcode-" + n.toLowerCase()) && (e[n] = t.getAttribute("jsbarcode-" + n.toLowerCase())), t.hasAttribute("data-" + n.toLowerCase()) && (e[n] = t.getAttribute("data-" + n.toLowerCase())));
        return e.value = t.getAttribute("jsbarcode-value") || t.getAttribute("data-value"), e = (0, a.default)(e)
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var i = n(17), a = r(i), s = n(3), u = r(s);
    e.default = o
}, function (t, e) {
    "use strict";
    function n(t) {
        var e = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];
        for (var n in e)e.hasOwnProperty(n) && (n = e[n], "string" == typeof t[n] && (t[n] = parseInt(t[n], 10)));
        return "string" == typeof t.displayValue && (t.displayValue = "false" != t.displayValue), t
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.default = n
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var i = n(0), a = r(i), s = n(4), u = function () {
        function t(e, n, r) {
            o(this, t), this.canvas = e, this.encodings = n, this.options = r
        }

        return t.prototype.render = function () {
            if (!this.canvas.getContext)throw new Error("The browser does not support canvas.");
            this.prepareCanvas();
            for (var t = 0; t < this.encodings.length; t++) {
                var e = (0, a.default)(this.options, this.encodings[t].options);
                this.drawCanvasBarcode(e, this.encodings[t]), this.drawCanvasText(e, this.encodings[t]), this.moveCanvasDrawing(this.encodings[t])
            }
            this.restoreCanvas()
        }, t.prototype.prepareCanvas = function () {
            var t = this.canvas.getContext("2d");
            t.save(), (0, s.calculateEncodingAttributes)(this.encodings, this.options, t);
            var e = (0, s.getTotalWidthOfEncodings)(this.encodings), n = (0, s.getMaximumHeightOfEncodings)(this.encodings);
            this.canvas.width = e + this.options.marginLeft + this.options.marginRight, this.canvas.height = n, t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.options.background && (t.fillStyle = this.options.background, t.fillRect(0, 0, this.canvas.width, this.canvas.height)), t.translate(this.options.marginLeft, 0)
        }, t.prototype.drawCanvasBarcode = function (t, e) {
            var n, r = this.canvas.getContext("2d"), o = e.data;
            n = "top" == t.textPosition ? t.marginTop + t.fontSize + t.textMargin : t.marginTop, r.fillStyle = t.lineColor;
            for (var i = 0; i < o.length; i++) {
                var a = i * t.width + e.barcodePadding;
                "1" === o[i] ? r.fillRect(a, n, t.width, t.height) : o[i] && r.fillRect(a, n, t.width, t.height * o[i])
            }
        }, t.prototype.drawCanvasText = function (t, e) {
            var n = this.canvas.getContext("2d"), r = t.fontOptions + " " + t.fontSize + "px " + t.font;
            if (t.displayValue) {
                var o, i;
                i = "top" == t.textPosition ? t.marginTop + t.fontSize - t.textMargin : t.height + t.textMargin + t.marginTop + t.fontSize, n.font = r, "left" == t.textAlign || e.barcodePadding > 0 ? (o = 0, n.textAlign = "left") : "right" == t.textAlign ? (o = e.width - 1, n.textAlign = "right") : (o = e.width / 2, n.textAlign = "center"), n.fillText(e.text, o, i)
            }
        }, t.prototype.moveCanvasDrawing = function (t) {
            var e = this.canvas.getContext("2d");
            e.translate(t.width, 0)
        }, t.prototype.restoreCanvas = function () {
            var t = this.canvas.getContext("2d");
            t.restore()
        }, t
    }();
    e.default = u
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t) {
        switch (t) {
            case"canvas":
                return a.default;
            case"svg":
                return u.default;
            default:
                throw new Error("Invalid rederer")
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.getRendererClass = void 0;
    var i = n(18), a = r(i), s = n(20), u = r(s);
    e.getRendererClass = o
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e, n) {
        var r = document.createElementNS(l, "g");
        return r.setAttribute("transform", "translate(" + t + ", " + e + ")"), n.appendChild(r), r
    }

    function a(t, e) {
        t.setAttribute("style", "fill:" + e.lineColor + ";")
    }

    function s(t, e, n, r, o) {
        var i = document.createElementNS(l, "rect");
        i.setAttribute("x", t), i.setAttribute("y", e), i.setAttribute("width", n), i.setAttribute("height", r), o.appendChild(i)
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var u = n(0), f = r(u), c = n(4), l = "http://www.w3.org/2000/svg", d = function () {
        function t(e, n, r) {
            o(this, t), this.svg = e, this.encodings = n, this.options = r
        }

        return t.prototype.render = function () {
            var t = this.options.marginLeft;
            this.prepareSVG();
            for (var e = 0; e < this.encodings.length; e++) {
                var n = this.encodings[e], r = (0, f.default)(this.options, n.options), o = i(t, r.marginTop, this.svg);
                a(o, r), this.drawSvgBarcode(o, r, n), this.drawSVGText(o, r, n), t += n.width
            }
        }, t.prototype.prepareSVG = function () {
            for (; this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);
            (0, c.calculateEncodingAttributes)(this.encodings, this.options);
            var t = (0, c.getTotalWidthOfEncodings)(this.encodings), e = (0, c.getMaximumHeightOfEncodings)(this.encodings), n = t + this.options.marginLeft + this.options.marginRight;
            this.setSvgAttributes(n, e)
        }, t.prototype.drawSvgBarcode = function (t, e, n) {
            var r, o = n.data;
            r = "top" == e.textPosition ? e.fontSize + e.textMargin : 0;
            for (var i = 0, a = 0, u = 0; u < o.length; u++)a = u * e.width + n.barcodePadding, "1" === o[u] ? i++ : i > 0 && (s(a - e.width * i, r, e.width * i, e.height, t), i = 0);
            i > 0 && s(a - e.width * (i - 1), r, e.width * i, e.height, t)
        }, t.prototype.drawSVGText = function (t, e, n) {
            var r = document.createElementNS(l, "text");
            if (e.displayValue) {
                var o, i;
                r.setAttribute("style", "font:" + e.fontOptions + " " + e.fontSize + "px " + e.font), i = "top" == e.textPosition ? e.fontSize - e.textMargin : e.height + e.textMargin + e.fontSize, "left" == e.textAlign || n.barcodePadding > 0 ? (o = 0, r.setAttribute("text-anchor", "start")) : "right" == e.textAlign ? (o = n.width - 1, r.setAttribute("text-anchor", "end")) : (o = n.width / 2, r.setAttribute("text-anchor", "middle")), r.setAttribute("x", o), r.setAttribute("y", i), r.appendChild(document.createTextNode(n.text)), t.appendChild(r)
            }
        }, t.prototype.setSvgAttributes = function (t, e) {
            var n = this.svg;
            n.setAttribute("width", t + "px"), n.setAttribute("height", e + "px"), n.setAttribute("x", "0px"), n.setAttribute("y", "0px"), n.setAttribute("viewBox", "0 0 " + t + " " + e), n.setAttribute("xmlns", l), n.setAttribute("version", "1.1"), n.style.transform = "translate(0,0)", this.options.background && (n.style.background = this.options.background)
        }, t
    }();
    e.default = d
}, function (t, e, n) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {default: t}
    }

    function o(t, e) {
        _.prototype[e] = _.prototype[e.toUpperCase()] = _.prototype[e.toLowerCase()] = function (n, r) {
            var o = this;
            return o._errorHandler.wrapBarcodeCall(function () {
                var a = (0, l.default)(o._options, r), s = t[e], u = i(n, s, a);
                return o._encodings.push(u), o
            })
        }
    }

    function i(t, e, n) {
        t = "" + t;
        var r = new e(t, n);
        if (!r.valid())throw new b.InvalidInputException(r.constructor.name, t);
        var o = r.encode();
        o = (0, h.default)(o);
        for (var i = 0; i < o.length; i++)o[i].options = (0, l.default)(n, o[i].options);
        return o
    }

    function a() {
        return f.default.CODE128 ? "CODE128" : Object.keys(f.default)[0]
    }

    function s(t, e, n) {
        e = (0, h.default)(e);
        for (var r = 0; r < e.length; r++)e[r].options = (0, l.default)(n, e[r].options), (0, g.default)(e[r].options);
        (0, g.default)(n);
        var o = t.renderer, i = new o(t.element, e, n);
        i.render(), t.afterRender && t.afterRender()
    }

    var u = n(5), f = r(u), c = n(0), l = r(c), d = n(9), h = r(d), p = n(7), g = r(p), v = n(8), y = r(v), x = n(6), m = r(x), b = n(2), C = n(3), w = r(C), _ = function () {
    }, E = function (t, e, n) {
        var r = new _;
        if ("undefined" == typeof t)throw Error("No element to render on was provided.");
        return r._renderProperties = (0, y.default)(t), r._encodings = [], r._options = w.default, r._errorHandler = new m.default(r), "undefined" != typeof e && (n = n || {}, n.format || (n.format = a()), r.options(n)[n.format](e, n).render()), r
    };
    E.getModule = function (t) {
        return f.default[t]
    };
    for (var O in f.default)f.default.hasOwnProperty(O) && o(f.default, O);
    _.prototype.options = function (t) {
        return this._options = (0, l.default)(this._options, t), this
    }, _.prototype.blank = function (t) {
        var e = "0".repeat(t);
        return this._encodings.push({data: e}), this
    }, _.prototype.init = function () {
        if (this._renderProperties) {
            Array.isArray(this._renderProperties) || (this._renderProperties = [this._renderProperties]);
            var t;
            for (var e in this._renderProperties) {
                t = this._renderProperties[e];
                var n = (0, l.default)(this._options, t.options);
                "auto" == n.format && (n.format = a());
                var r = n.value, o = f.default[n.format.toUpperCase()], u = i(r, o, n);
                s(t, u, n)
            }
        }
    }, _.prototype.render = function () {
        if (!this._renderProperties)throw new b.NoElementException;
        if (Array.isArray(this._renderProperties))for (var t = 0; t < this._renderProperties.length; t++)s(this._renderProperties[t], this._encodings, this._options); else s(this._renderProperties, this._encodings, this._options);
        return this
    }, _.prototype._defaults = w.default, "undefined" != typeof window && (window.JsBarcode = E), "undefined" != typeof jQuery && (jQuery.fn.JsBarcode = function (t, e) {
        var n = [];
        return jQuery(this).each(function () {
            n.push(this)
        }), E(n, t, e)
    }), t.exports = E
}]);