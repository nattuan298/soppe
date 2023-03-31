"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationTransformer = void 0;
function paginationTransformer(input) {
    return {
        data: input.docs,
        total: input.totalDocs,
        page: input.page,
        limit: input.limit,
    };
}
exports.paginationTransformer = paginationTransformer;
//# sourceMappingURL=helpers.js.map